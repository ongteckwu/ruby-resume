# Read about factories at https://github.com/thoughtbot/factory_girl
require 'faker'

FactoryGirl.define do
  factory :comment do |f|
    f.name {Faker::Name.name}
    f.comment {Faker::Lorem.sentences.join(' ')}

    factory :comment_with_blogpost do
    	blogpost
    end
  end
end
