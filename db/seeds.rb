# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# User seed data

User.create(username: 'Admin', password: 'password')

num_users = 7
num_users.times do
  user_params = {}
  user_params[:username] = Faker::Name.name
  user_params[:password] = Faker::Internet.password(6)

  User.create!(user_params)
end

# Optimization.new(title: 'test', description: 'testing', investment_time: '22', time_saved_per_occurrence: '1', frequency: '22', user_id: '1')

optimizations_per_user = 3

num_users.times do
  optimizations_per_user.times do |i|
    opt_params = {}
    opt_params[:title] = Faker::Address.city
    opt_params[:description] = Faker::Hacker.say_something_smart
    opt_params[:investment_time] = Faker::Number.number(7)
    opt_params[:time_saved_per_occurrence] = Faker::Number.number(3)
    opt_params[:frequency] = rand(10...60)
    opt_params[:user_id] = i

    Optimization.create!(opt_params)
  end
end
