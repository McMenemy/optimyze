# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# User seed data

User.create(username: 'Admin', password: 'password')

10.times do
  opt_params = {}
  opt_params[:title] = Faker::Address.city
  opt_params[:description] = Faker::Hacker.say_something_smart
  opt_params[:investment_time] = Faker::Number.number(7)
  opt_params[:time_saved_per_occurrence] = Faker::Number.number(3)
  opt_params[:frequency] = rand(10...365)
  opt_params[:public] = true

  Optimization.create(opt_params)
end
