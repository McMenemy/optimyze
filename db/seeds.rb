# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# User seed data

User.create(username: 'Admin', password: 'password')

num_users = 4
num_users.times do
  user_params = {}
  user_params[:username] = Faker::Name.name
  user_params[:password] = Faker::Internet.password(6)

  User.create!(user_params)
end

# Optimization.new(title: 'test', description: 'testing', investment_time: '22', time_saved_per_occurrence: '1', frequency: '22', user_id: '1')

# Exercise
Optimization.create!(
  title: 'FOCUS T25 Workout',
  description: 'T25 is a beachbody.com 60-day workout video series that uses high-interval, high-intensity exercises to get an hours worth of exercise in 25 minutes. The early videos require no equipment and later videos use light dumbells. Different videos focus on working different muscle groups and get progressivly more difficult. See the details here: https://www.beachbody.com/product/fitness_programs/focus-t25-workout.do . Also, saves time on not having to drive to gym. Investment time is just ordering the videos online. The series cost about $100, which is not too bad when you compare that to the cost of a gym membership.',
  investment_time: '300000',
  time_saved_per_occurrence: '2700000',
  frequency: '121000000',
  user_id: '1'
)

# Sleep
Optimization.create!(
  title: 'Don\'t hit snooze',
  description: 'The sleep gained from snoozeing is not good quality, so you may as get moving quickly to set a good start to the day =)',
  investment_time: '0',
  time_saved_per_occurrence: '600000',
  frequency: '86400000',
  user_id: '2'
)

Optimization.create!(
  title: 'Never hit snooze for the undisciplined',
  description: 'For those of you, like me, who want to save time by not snoozing, but can\'t muster up the willpower in the morning; there are apps that make you pay money to charities everytime you hit snooze. (If thats not enough you can even set it up to make you pay moeny to organizations you don\'t like...). Here\'s a link to one app there are many out there: http://www.theguardian.com/voluntary-sector-network/2014/oct/29/-sp-snooze-button-app-charity-donation-icukoo , Investment time is the 5-10 minutes it takes to find and download the app to your phone',
  investment_time: '600000',
  time_saved_per_occurrence: '600000',
  frequency: '86400000',
  user_id: '1'
)


optimizations_per_user = 3

num_users.times do
  optimizations_per_user.times do |i|
    opt_params = {}
    opt_params[:title] = Faker::Address.city
    opt_params[:description] = Faker::Hacker.say_something_smart
    opt_params[:investment_time] = Faker::Number.number(7) # about a few hours
    opt_params[:time_saved_per_occurrence] = Faker::Number.number(6) # about 10 minutes
    opt_params[:frequency] = Faker::Number.number(9) # about every several days to week
    opt_params[:user_id] = i

    Optimization.create!(opt_params)
  end
end

Category.create(name: 'sleep')
Category.create(name: 'technology')
Category.create(name: 'exercise')

num_optimizations = num_users * optimizations_per_user

num_optimizations.times do |i|
  CategoryOptimization.create(category_id: 1, optimization_id: i)
  CategoryOptimization.create(category_id: 2, optimization_id: i)
  CategoryOptimization.create(category_id: 3, optimization_id: i)
end
