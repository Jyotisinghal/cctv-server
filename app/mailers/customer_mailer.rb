class CustomerMailer < ApplicationMailer
	def send_welcome_mail(customer)
		@customer = customer
		@items = @customer.items.all
		mail(to:customer.email,from:"smarttechno.vishal@gmail.com",subject:"confirmation",message:"")
	end
end
