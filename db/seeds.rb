# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

1.upto(20) do |n|
	Blogpost.create(title: "Lorem ipsum dolor sit amet,
	 consectetur adipisicing elit. Autem explicabo sequi quibusdam.",
	 				content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
	 				Vero provident velit sapiente quas quibusdam suscipit voluptatem ipsum 
	 				d veniam atque, assumenda ea fugiat aliquam necessitatibus. Mollitia, 
	 				int animi tempora odit sapiente quasi consequuntur? Debitis repellat d
	 				loremque temporibus architecto saepe, fuga, doloribus eligendi quia odit ve
	 				ritatis, illo laboriosam at ullam excepturi!")
end