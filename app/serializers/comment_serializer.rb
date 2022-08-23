class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :user
  has_one :user
  has_one :round
end
