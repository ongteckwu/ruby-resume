require 'spec_helper'
require 'rails_helper'

def create_post_before_all
	before(:all) do 
		@post = FactoryGirl.create(:blogpost)
	end
end

describe Blogpost do
	create_post_before_all
	context "Factory testing" do
		create_post_before_all
		it "has a valid factory" do
			expect(@post).to be_valid	
		end
		it "is not new record" do
			expect(@post).to_not be_new_record
		end

		it "is invalid without title" do
			expect(FactoryGirl.build(:blogpost, title: nil)).to_not be_valid
		end

		it "is invalid without a blogpost" do
			expect(FactoryGirl.build(:blogpost, content: nil)).to_not be_valid
		end

		it "should not create two of the same posts" do
			FactoryGirl.create(:blogpost_same)
			expect(FactoryGirl.build(:blogpost_same)).to_not be_valid
		end
	end

	context "Model testing" do
		it "has can truncate properly" do
			content = "Apple Bear Cake Shit and Everything Nice."
			expect(Blogpost.new(title:"#", content:content)
						   .truncated_post(3))
						   .to eq(content.truncate(3, seperator: ''))
		end

		it "produces correct descending blogposts" do
			blogposts = Blogpost.order(created_at: :desc).limit(10).offset(3)
			expect(Blogpost.desc_blogposts(10, 3)).to eq(blogposts)
		end

		it "produces long ordinal" do
			expect(@post[:created_at].to_formatted_s(:long_ordinal))
									 .to eq(@post.long_ordinal)
		end
	end
end