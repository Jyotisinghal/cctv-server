class Customer < ApplicationRecord
  
  
  has_many :items, dependent: :destroy, inverse_of: :customer
  has_many :dome_cameras, ->{ where(product_name: "DOME CAMERA") }, :class_name => "Item", dependent: :destroy, inverse_of: :customer
  has_many :bullet_cameras, ->{ where(product_name: "BULLET CAMERA") }, class_name: "Item", dependent: :destroy, inverse_of: :customer
  has_many :dvrs, ->{ where(product_name: "DVR") }, class_name: "Item", dependent: :destroy, inverse_of: :customer
  has_many :smpss, ->{ where(product_name: "SMPS") }, class_name: "Item", dependent: :destroy, inverse_of: :customer
  has_many :connectors, ->{ where(product_name: "CONNECTOR") }, class_name: "Item", dependent: :destroy, inverse_of: :customer
  has_many :hdds, ->{ where(product_name: "HDD") }, class_name: "Item", dependent: :destroy, inverse_of: :customer
  has_many :wires, ->{ where(product_name: "WIRE") }, class_name: "Item", dependent: :destroy, inverse_of: :customer
  has_many :installations, ->{ where(product_name: "INSTALLATION") }, class_name: "Item", dependent: :destroy, inverse_of: :customer
 

  accepts_nested_attributes_for :items, allow_destroy: true
  accepts_nested_attributes_for :dome_cameras, allow_destroy: true
  accepts_nested_attributes_for :bullet_cameras, allow_destroy: true
  accepts_nested_attributes_for :dvrs, allow_destroy: true
  accepts_nested_attributes_for :smpss, allow_destroy: true
  accepts_nested_attributes_for :connectors, allow_destroy: true
  accepts_nested_attributes_for :hdds, allow_destroy: true
  accepts_nested_attributes_for :wires, allow_destroy: true
  accepts_nested_attributes_for :installations, allow_destroy: true

  # validates_associated :items
  


  validates :name, presence: true
  validates_format_of :email, :with => /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/ 
  validates_length_of :contact, is: 10
  validates :address, presence: true
end
