class User < ApplicationRecord
    has_many :golfbuddies
    has_many :friends, through: :golf_buddies


    has_secure_password
    validates :username, uniqueness: true
    validates :password, length: {minimum: 5, wrong_length: "Password must be at least 5 characters."}
end
