class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :city, :state, :handicap, :profile_pic, :username, :password_digest
end
