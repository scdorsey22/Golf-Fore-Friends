User.destroy_all

puts "seeding"

User.create(first_name: 'Shane', last_name: 'Dorsey', email: 'scdorsey22@gmail.com', city: 'Oceanside' , state: 'CA' , handicap: '10' , username: 'scdorsey' , password: 'guitar22' )
User.create(first_name: 'Mike', last_name: 'Borcich', email: 'mike22@gotmail.com', city: 'Denver', state: 'CO', handicap: '6' , username: 'mikeb' , password: 'bizzle')
User.create(first_name: 'Marshall', last_name: 'Olin' , email: 'marshall@gotmail.com', city: 'San Diego', state: 'CA', handicap: '18', username: 'marsh', password: 'stachio' )

puts "Done seeding"
