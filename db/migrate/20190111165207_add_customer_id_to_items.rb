class AddCustomerIdToItems < ActiveRecord::Migration[5.2]
  def change
  	add_column :items, :customer_id, :integer
  end
end
