
class CustomersController < ApplicationController
  before_action :set_customer, only: [:show, :edit, :update]

  def show
    @customer = Customer.find(params[:id])
    @items = @customer.items.all
  end

  def new
    @customer = Customer.new
    @customer.dome_cameras.new
    @customer.bullet_cameras.new
    @customer.dvrs.new
    @customer.smpss.new
    @customer.connectors.new
    @customer.hdds.new
    @customer.wires.new
    @customer.installations.new
  end
  
  def edit
   
  end

  def create
    @customer = Customer.new(customer_params)

    respond_to do |format|
      if @customer.save
        CustomerMailer.send_welcome_mail(@customer).deliver!
        format.html { redirect_to @customer, notice: 'YOUR REQUEST IS CONFIRMED...!' }
        format.json { render :show, status: :created, location: @customer }
      else
        format.html { render :new }
        format.json { render json: @customer.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @customer.update(customer_params)
        format.html { redirect_to @customer, notice: 'Customer was successfully updated.' }
        format.json { render :show, status: :ok, location: @customer }
      else
        format.html { render :edit }
        format.json { render json: @customer.errors, status: :unprocessable_entity }
      end
    end
  end

  # def destroy
  #   @customer.destroy
  #   respond_to do |format|
  #     format.html { redirect_to customers_url, notice: 'Customer was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_customer
      @customer = Customer.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def customer_params
  
      # params.require(:customer).permit(:id, :name, :contact, :email, :address, items_attributes: Item.attribute_names.map(&:to_sym).push(:_destroy))
      params.require(:customer).permit(:id, :name, :contact, :email, :address, :dome_cameras_attributes => [:id, :_destroy, :product_name, :customer_id, :cctv_id, :price, :quantity], :bullet_cameras_attributes => [:id, :_destroy, :product_name, :customer_id, :cctv_id, :price, :quantity], :dvrs_attributes => [:id, :_destroy, :product_name, :customer_id, :cctv_id, :price, :quantity],:smpss_attributes => [:id, :_destroy, :product_name, :customer_id, :cctv_id, :price, :quantity], :connectors_attributes => [:id, :_destroy, :product_name, :customer_id, :cctv_id, :price, :quantity], :hdds_attributes => [:id, :_destroy, :product_name, :customer_id, :cctv_id, :price, :quantity], :wires_attributes => [:id, :_destroy, :product_name, :customer_id, :cctv_id, :price, :quantity], :installations_attributes => [:id, :_destroy, :product_name, :customer_id, :cctv_id, :price, :quantity])
      # params.require(:customer).permit(:name, :contact, :email, :address, :dome_cameras_attributes => [:id, :_destroy, :product_name, :customer_id, :cctv_id, :price, :quantity])
      
    end
end
