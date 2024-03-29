User.destroy_all
User.reset_pk_sequence
GolfBuddy.destroy_all
GolfBuddy.reset_pk_sequence
Round.destroy_all
Round.reset_pk_sequence
Comment.destroy_all
Comment.reset_pk_sequence

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

User.create(
        first_name: 'Shane', 
        last_name: 'Dorsey', 
        email: 'scdorsey22@gmail.com', 
        city: 'San Diego', 
        state: 'CA', 
        handicap: '10',
        profile_pic: 'https://www.pngitem.com/pimgs/m/83-839341_golfing-clipart-golf-team-mens-golf-clip-art.png',
        username: 'scdorsey22', 
        password: 'golfer22' ,

)

User.create(
    first_name: 'Tiger', 
    last_name: 'Woods', 
    email: 'tiger@pgatour.com', 
    city: 'Jupiter', 
    state: 'FL', 
    handicap: '0',
    profile_pic: 'https://cloudfront-us-east-2.images.arcpublishing.com/reuters/ZIAXKWQPIJNLRJZ2A7J5UKBSEQ.jpg',
    username: 'eltigre', 
    password: 'golfer22' ,

)

User.create(
    first_name: 'Rickie', 
    last_name: 'Fowler', 
    email: 'ricke@fowler.com', 
    city: 'Jupiter', 
    state: 'FL', 
    handicap: '0',
    profile_pic: 'https://www.golfchannel.com/sites/default/files/2022/10/16/Fowler_1920_Zozo22_Sunglasses.jpg',
    username: 'rickiebobby', 
    password: 'golfer22' ,

)

User.create(
    first_name: 'Phil', 
    last_name: 'Mickleson', 
    email: 'phil@phil.com', 
    city: 'San Diego', 
    state: 'CA', 
    handicap: '0',
    profile_pic: 'https://cdn.golfmagic.com/styles/scale_768/s3/user-content/2022-10-28T210335Z_1921049793_MT1USATODAY19313499_RTRMADP_3_GOLF-LIV-GOLF-FIRST-ROUND_3.JPG?itok=EptcLgkR',
    username: 'philm', 
    password: 'golfer22' ,

)


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
    { user_id: 10, friend_id: 5 },
    {user_id: 11, friend_id: 10 },
    {user_id: 11, friend_id: 3 }
])

puts "Adding Rounds..."
5.times do
    Round.create(
        description: Faker::Lorem.sentence, 
        date: Faker::Date.forward(days: 23),
        course: "Torrey Pines",
        user_id: User.ids.sample,
    )
end

5.times do
    Round.create(
        description: Faker::Lorem.sentence, 
        date: Faker::Date.forward(days: 23),
        course: "Encinitas Ranch",
        user_id: User.ids.sample,
    )
end

5.times do
    Round.create(
        description: Faker::Lorem.sentence, 
        date: Faker::Date.forward(days: 23),
        course: "Aviara",
        user_id: User.ids.sample,
    )
end


puts "Adding Comments..."
20.times do
    Comment.create(
        comment: Faker::Lorem.sentence, 
        user_id: User.ids.sample,
        round_id: Round.ids.sample,
    )
end



puts "Done seeding"
