class User < ApplicationRecord
    has_many :golf_buddies
    has_many :friends, through: :golf_buddies

    has_many :rounds

    has_many :comments
    has_many :commented_posts, through: :comments, source: :rounds


    has_secure_password
    validates :username, uniqueness: true
    # validates :password, length: {minimum: 5, wrong_length: "Password must be at least 5 characters."}

    def generate_password_token!
      self.password_reset_token = generate_base64_token
      self.password_reset_sent_at = Time.zone.now
      save!
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
