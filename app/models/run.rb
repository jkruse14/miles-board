class Run < ApplicationRecord
    belongs_to :user
    belongs_to :team

    validates :distance, presence: true, numericality: { greater_than: 0 }
end
