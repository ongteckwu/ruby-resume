class TeckwuGenGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('../templates', __FILE__)
  argument :name

  def create_name
  	@name = "#{name.underscore}"
  end

  def generate_css
  	template "teckwu_b.css.scss.erb",
  			 "app/assets/stylesheets/#{@name}_bundle.css.scss"
  	empty_directory "app/assets/stylesheets/#{@name}_css"
  	create_file "app/assets/stylesheets/#{@name}_css/#{@name}.css.scss"
  end

  def generate_js
  	template "teckwu_b.js.erb",
  			 "app/assets/javascripts/#{@name}_bundle.js"
  	empty_directory "app/assets/javascripts/#{@name}_library"
  	create_file "app/assets/javascripts/#{@name}_library/#{@name}.js"
  end

  def invoke_controller
  	generate "controller", "#{@name}", "index"
  end

  def remove_files
  	remove_file "app/assets/javascripts/#{@name}.js.coffee"
  	remove_file "app/assets/stylesheets/#{@name}.css.scss"
  end

  def create_index
    template "teckwu_index.html.haml.erb",
             "app/views/#{@name}/index.html.haml"
  end


end
