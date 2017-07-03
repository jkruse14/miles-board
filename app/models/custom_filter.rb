class CustomFilter < ApplicationRecord
    belongs_to :custom_tab

    before_save { object_type.downcase! }

    validates :filter_field, presence: true
    validates :filter_value, presence: true
    validates :object_type, presence: true, inclusion: { in: ['user', 'team', 'run'] }
    validates :comparator, presence: true, inclusion: { in: ['lt', 'lte','gt','gte','eq'] }
end
