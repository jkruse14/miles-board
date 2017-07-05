class CustomTab < ApplicationRecord
  belongs_to :team
  has_many :custom_filters, dependent: :destroy

  validates :heading, presence: true
end
