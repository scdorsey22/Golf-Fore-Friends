class UserShowSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :city, :state, :handicap, :profile_pic, :rounds, :friends, :username, :password_digest
end
