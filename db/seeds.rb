# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# User seed data

User.create(username: 'User42', password: 'password')

num_users = 4
num_users.times do
  user_params = {}
  user_params[:username] = Faker::Name.name
  user_params[:password] = Faker::Internet.password(6)

  User.create!(user_params)
end

# Optimization.new(title: 'test', description: 'testing', investment_time: '22', time_saved_per_occurrence: '1', frequency: '22', user_id: '1')

Category.create(name: 'exercise')
exercise_id = 1
Category.create(name: 'food')
food_id = 2
Category.create(name: 'household')
household_id = 3
Category.create(name: 'sleep')
sleep_id = 4
Category.create(name: 'social')
social_id = 5
Category.create(name: 'tech')
tech_id = 6
Category.create(name: 'transport')
transport_id = 7
Category.create(name: 'other')
other_id = 8
Category.create(name: 'all')
all_id = 9
optim_id = 0

# Exercise
Optimization.create!(
  title: 'FOCUS T25 Workout Series',
  description: 'T25 is a beachbody.com 60-day workout video series that uses high-interval, high-intensity exercises to get an hours worth of exercise in 25 minutes. The early videos require no equipment and later videos use light dumbells. Different videos focus on working different muscle groups and get progressivly more difficult. See the details here: https://www.beachbody.com/product/fitness_programs/focus-t25-workout.do . Also, saves time on not having to drive to gym. Investment time is just ordering the videos online. The series cost about $100, which is not too bad when you compare that to the cost of a gym membership.',
  investment_time: '300000',
  time_saved_per_occurrence: '2700000',
  frequency: '121000000',
  user_id: '1'
)
CategoryOptimization.create(category_id: exercise_id, optimization_id: optim_id += 1)


Optimization.create!(
  title: 'P90x3 Workout Series',
  description: 'Made from the same guy who made P90x, but workouts are only 25 minutes instead of 1 hour. Requires pull up bar and dumbells and focuses on getting you ripped as efficently as possible. They might be short workouts but they are not easy! Also, saves time on not having to drive to the gym. Link: https://www.beachbody.com/product/fitness_programs/p90x3-workout.do
 ',
  investment_time: '300000',
  time_saved_per_occurrence: '2700000',
  frequency: '121000000',
  user_id: '1'
)
CategoryOptimization.create(category_id: exercise_id, optimization_id: optim_id += 1)



# Food
Optimization.create!(
  title: 'Soylent',
  description: 'Soylent comes in either a bottle or powder form and was created by engineers to have everything the body needs! Don\'t waste time decideing what to eat or prepping food again! (For those not willing to switch every meal to Soylent you can also just use it as needed for a quick ToGo meal. https://www.soylent.com/ (Comes out roughly $3 a meal.)',
  investment_time: '0',
  time_saved_per_occurrence: '900000',
  frequency: '28800000',
  user_id: '1'
)
CategoryOptimization.create(category_id: food_id, optimization_id: optim_id += 1)

# Sleep
Optimization.create!(
  title: 'Don\'t hit snooze',
  description: 'The sleep gained from snoozeing is not good quality, so you may as get moving quickly to set a good start to the day =)',
  investment_time: '0',
  time_saved_per_occurrence: '600000',
  frequency: '86400000',
  user_id: '1'
)
CategoryOptimization.create(category_id: sleep_id, optimization_id: optim_id += 1)

Optimization.create!(
  title: 'Never hit snooze for the undisciplined',
  description: 'For those of you, like me, who want to save time by not snoozing, but can\'t muster up the willpower in the morning; there are apps that make you pay money to charities everytime you hit snooze. (If thats not enough you can even set it up to make you pay moeny to organizations you don\'t like...). Here\'s a link to one app there are many out there: http://www.theguardian.com/voluntary-sector-network/2014/oct/29/-sp-snooze-button-app-charity-donation-icukoo , Investment time is the 5-10 minutes it takes to find and download the app to your phone',
  investment_time: '600000',
  time_saved_per_occurrence: '600000',
  frequency: '86400000',
  user_id: '1'
)
CategoryOptimization.create(category_id: sleep_id, optimization_id: optim_id += 1)

# Social
Optimization.create!(
  title: 'Automatically text your significant other sweet things',
  description: 'http://broapp.net/ is an app that automatically texts your significant other sweet things. You can set a schedule and choose a message or make a custom message for sweet messages to be sent. It also adds some randomness to the schedule and won\'t send messages if you\'ve recently talked to your significant other or if you are connected to their WIFI',
  investment_time: '1800000',
  time_saved_per_occurrence: '120000',
  frequency: '86400000',
  user_id: '1'
)
CategoryOptimization.create(category_id: sleep_id, optimization_id: optim_id += 1)


# Tech
Optimization.create!(
  title: 'Learn Chrome hotkeys',
  description: 'Chrome has a bunch of built in keyboard shortcuts for navigation such as opening new tabs, closing tabs, switching between tabs, going back in history etc. Using a keyboard shortcut saves at least half a second every time over having to move your hand to the mouse and back to the keyboard. Here is a link to the shortcuts: https://support.google.com/chrome/answer/157179?hl=en . There is a slight learning curve of having to look up the shortcuts until you memorize them, so you probably lose 10 minutes or so over the first week until you become proficient. I estimated I use these shortcuts at least 20 times a day, conservaly.',
  investment_time: '600000',
  time_saved_per_occurrence: '500',
  frequency: '3600000',
  user_id: '1'
)
CategoryOptimization.create(category_id: tech_id, optimization_id: optim_id += 1)

Optimization.create!(
  title: 'Use Amazon Subscription',
  description: 'Using Amazon subscriptions you can have most household and toiletry items delivered to you at any set time interval you desire (with prime shipping is also free.) So, instead of spending 20 minutes everytime you go to the store to find these items you can just have them always show up at door. Investment time is just the 30 minutes it takes to find all your items on amazon and set up the subscriptions',
  investment_time: '108000000',
  time_saved_per_occurrence: '72000000',
  frequency: '1210000000',
  user_id: '1'
)
CategoryOptimization.create(category_id: tech_id, optimization_id: optim_id += 1)
CategoryOptimization.create(category_id: household_id, optimization_id: optim_id)

# Transport
Optimization.create!(
  title: 'Self-balancing two-wheeled board',
  description: 'Instead of walking use one of those self-balacning two-wheeled boards: https://en.wikipedia.org/wiki/Self-balancing_two-wheeled_board . To estimate the time saved I looked up the speed of the boards which is 6-10mph so easily twice as fast as a person walks. The avg American walks 40 minutes a day so on average a person would save 20 minutes a day!',
  investment_time: '600000',
  time_saved_per_occurrence: '1200000',
  frequency: '86400000',
  user_id: '1'
)
CategoryOptimization.create(category_id: transport_id, optimization_id: optim_id += 1)


# Other
Optimization.create!(
  title: 'Wear Loafers only',
  description: 'Don\t waste time tieing your shoes - just always wear loafers =). Only requires the investment time of buying a pair of loafers',
  investment_time: '600000',
  time_saved_per_occurrence: '5000',
  frequency: '86400000',
  user_id: '1'
)
CategoryOptimization.create(category_id: other_id, optimization_id: optim_id += 1)



# optimizations_per_user = 3
#
# num_users.times do
#   optimizations_per_user.times do |i|
#     opt_params = {}
#     opt_params[:title] = Faker::Address.city
#     opt_params[:description] = Faker::Hacker.say_something_smart
#     opt_params[:investment_time] = Faker::Number.number(7) # about a few hours
#     opt_params[:time_saved_per_occurrence] = Faker::Number.number(6) # about 10 minutes
#     opt_params[:frequency] = Faker::Number.number(9) # about every several days to week
#     opt_params[:user_id] = i
#
#     Optimization.create!(opt_params)
#   end
# end
#
# num_optimizations = num_users * optimizations_per_user
#
# num_optimizations.times do |i|
#   CategoryOptimization.create(category_id: 1, optimization_id: i)
#   CategoryOptimization.create(category_id: 2, optimization_id: i)
#   CategoryOptimization.create(category_id: 3, optimization_id: i)
# end
