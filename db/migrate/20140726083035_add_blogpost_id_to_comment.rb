class AddBlogpostIdToComment < ActiveRecord::Migration
  def up
    add_column :comments, :blogpost_id, :reference
  end

  def down
  	remove_column :comments, :blogpost_id
  end

end
