class User < ApplicationRecord
    has_many :golf_buddies
    has_many :friends, through: :golf_buddies

    has_many :rounds

    has_many :comments
    has_many :commented_posts, through: :comments, source: :rounds


    has_secure_password
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true
    
    # validates :password, length: {minimum: 5, wrong_length: "Password must be at least 5 characters."}

    def generate_password_token!
        update_columns(
            password_reset_token: generate_base64_token,
            password_reset_sent_at: Time.zone.now
          )
      UserMailer.password_reset(self).deliver_now
     end
     
     def password_token_valid?
      (self.password_reset_sent_at + 1.hours) > Time.zone.now
     end
     
     def reset_password!(password)
      self.password_reset_token = nil
      self.password = password
      save!
     end

    private

    def generate_base64_token
        SecureRandom.urlsafe_base64
    end

end
