class CreateCustomers < ActiveRecord::Migration[5.2]
  def change
    create_table :customers do |t|
      t.string :name
      t.string :email
      t.integer :contact
      t.string :address

      t.timestamps
    end
  end
end
