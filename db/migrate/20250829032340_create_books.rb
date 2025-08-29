class CreateBooks < ActiveRecord::Migration[8.0]
  def change
    create_table :books do |t|
      t.integer :author_id
      t.string :title
      t.integer :pages
      t.string :genre

      t.timestamps
    end
  end
end
