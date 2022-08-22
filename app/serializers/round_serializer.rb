class RoundSerializer < ActiveModel::Serializer
  attributes :id, :date, :course, :description
  has_one :user
end
