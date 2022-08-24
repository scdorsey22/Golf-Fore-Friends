class RoundSerializer < ActiveModel::Serializer
  attributes :id, :date, :course, :description, :comments, :user, :created_at
  has_one :user
end
