class TestController < ApplicationController
  def index
  	srand
  	cloud_scale = [1.6, 1.5, 1.55, 0.8, 1.33,
             0.8, 2, 2.1, 1.4, 1.9,
             0.9, 2.5, 0.6, 1.5, 1.4,
             1.8, 1.7, 0.86, 1.3, 1.8];
  	#position, gap
  	def cloud_gap(px, scale, maxscale)
  		scale/maxscale * px * (3.5 + rand * 0.5)
  	end

  	@cloud_parallax = [].tap do |arr|
  		0.upto(cloud_scale.length-1) do |x|
  			rand_num = -50 * x * rand
  			arr << [rand_num, rand_num - cloud_gap(500, 
  					cloud_scale[x], cloud_scale.max),
  					rand * 100 * x]
  		end
  	end

  end
end
