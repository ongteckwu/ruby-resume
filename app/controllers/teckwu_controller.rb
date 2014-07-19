class TeckwuController < ApplicationController
  def index
  	srand
  	cloud_scale = [1.6, 0.7, 1.15, 0.8, 1.33,
  				   0.8, 2, 0.8, 1.4, 1.2,
  				   1.2, 0.5, 1.2, 2, 1.4,
  				   1.5, 1.7, 0.86, 1.3, 1.8]
  	#position, gap
  	def cloud_gap(px, scale, maxscale)
  		scale/maxscale * px * (2.8 + rand * 0.5)
  	end

  	@cloud_parallax = [].tap do |arr|
  		0.upto(cloud_scale.length-1) do |x|
  			rand_num = -10 * x * rand
  			arr << [rand_num, rand_num - cloud_gap(350, 
  					cloud_scale[x], cloud_scale.max),
  					(rand + 0.6) * 70 * x]
  		end
  	end
  end
end
