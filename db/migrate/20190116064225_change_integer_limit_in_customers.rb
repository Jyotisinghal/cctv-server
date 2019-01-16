class ChangeIntegerLimitInCustomers < ActiveRecord::Migration[5.2]
  def change
  	change_column :customers, :contact, :integer, limit: 8
  end
end
