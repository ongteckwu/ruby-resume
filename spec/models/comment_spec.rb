require 'rails_helper'

describe Comment, :type => :model do
  context "Factory testing" do
  	before(:all) do
  		@comment = FactoryGirl.create(:comment_with_blogpost)
  	end

  	it "has a valid factory" do
  		expect(@comment).to be_valid
  	end

  	it "is not a new record" do
  		expect(@comment).to_not be_new_record
  	end

  	it "has an associated blogpost" do
  		expect(@comment.blogpost).to be_valid
  	end
  end
end
