class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :product_name
      t.integer :cctv_id
      t.integer :price
      t.integer :quantity

      t.timestamps
    end
  end
end
