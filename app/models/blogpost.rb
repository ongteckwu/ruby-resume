class Blogpost < ActiveRecord::Base
	validates :title, presence: true,
					  uniqueness: {message: "Title has already been taken."}  
	validates :content, presence: true
end
