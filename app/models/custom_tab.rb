class CustomTab < ApplicationRecord
  belongs_to :team
  has_many :custom_filters

  validates :heading, presence: true
end
