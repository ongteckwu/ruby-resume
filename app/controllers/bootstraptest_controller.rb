class BootstraptestController < ApplicationController
  def quotes
  end

  def index
  	params_id = params[:id].to_i
  	@id = params_id != 0 ? params_id : 1
  	@blogposts = Blogpost.order(created_at: :desc)
  						 .limit(5)
  						 .offset((@id-1) * 5)
  	#disable "Older" if last element of @blogposts is of id=1
  	@older_disable = true if @blogposts[-1][:id] == 1
  end


  def new
  	@blogpost = Blogpost.new
  end

  def create
  	@blogpost = Blogpost.new permitted_blogpost_attributes

  	if @blogpost.save
  		redirect_to "index"
  	else
  		render action: "new"
  	end
  end

  def permitted_blogpost_attributes
  	params.require(:blogpost).permit(:title, :content)
  end
end
