class RoundSerializer < ActiveModel::Serializer
  attributes :id, :date, :course, :description, :comments, :user
  has_one :user
end
