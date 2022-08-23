class Round < ApplicationRecord
  belongs_to :user

  has_many :comments, dependent: :destroy
  has_many :commented_users, through: :comments, source: :user, dependent: :destroy

  validates :description, presence: true, length: { maximum: 130 }
end
