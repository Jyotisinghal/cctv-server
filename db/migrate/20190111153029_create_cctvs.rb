class CreateCctvs < ActiveRecord::Migration[5.2]
  def change
    create_table :cctvs do |t|
      t.integer :product_id
      t.string :category
      t.integer :price

      t.timestamps
    end
  end
end
