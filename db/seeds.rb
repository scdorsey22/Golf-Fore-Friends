User.destroy_all
GolfBuddy.destroy_all

puts "seeding Users"
10.times do
    User.create(
        first_name: Faker::Name.first_name, 
        last_name: Faker::Name.last_name, 
        email: Faker::Internet.email, 
        city: 'San Diego', 
        state: 'CA', 
        handicap: rand(1..25) ,
        profile_pic: Faker::LoremFlickr.image( search_terms: ['sports', 'golf'] ) ,
        username: Faker::Internet.username , 
        password: Faker::Internet.password ,
    )
end

puts "seeding GolfBuddies"

GolfBuddy.create([
    { user_id: 1, friend_id: 10 },
    { user_id: 1, friend_id: 9 },
    { user_id: 2, friend_id: 8 },
    { user_id: 3, friend_id: 7 },
    { user_id: 4, friend_id: 6 },
    { user_id: 5, friend_id: 2 },
    { user_id: 6, friend_id: 1 },
    { user_id: 7, friend_id: 10 },
    { user_id: 8, friend_id: 9 },
    { user_id: 9, friend_id: 3 },
    { user_id: 10, friend_id: 5 }
])



puts "Done seeding"
