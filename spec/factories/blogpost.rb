require 'faker'

FactoryGirl.define do
	factory :blogpost do 
		title {Faker::Lorem.sentence(word_count= 5,
									   supplemental= false,
									   random_words_to_add= 6)}
		content {Faker::Lorem.paragraphs(paragraph_count= 2).join(' ')}
	end

	factory :blogpost_same, class: Blogpost do
		title {"Apple"}
		content {"Apples are awesome"}
	end
end