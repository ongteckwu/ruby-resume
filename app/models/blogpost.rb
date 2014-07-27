class Blogpost < ActiveRecord::Base
	validates :title, presence: true,
					  uniqueness: {message: "Title has already been taken."}  
	validates :content, presence: true
	has_many :comments, dependent: :destroy

	def truncated_post(length, seperator = ' ')
		content.truncate(truncate_at=length, 
						  seperator: seperator)
	end

	def self.desc_blogposts(limit, offset)
		self.order(created_at: :desc)
			.limit(limit)
			.offset(offset)
	end

	def long_ordinal
		created_at.to_formatted_s(:long_ordinal)
	end
end
