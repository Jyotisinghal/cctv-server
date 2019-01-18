// for dropdown
function productValues(){
  for (var i = 1; i <= 8; i++ ) {
  category = $('.'+i).val();
  selectProducts = cctvs[category + ":" + i];

   
    categoryDropdown = $('.1'+i);
    categoryDropdown.empty();
    categoryDropdown.append($("<option></option>")
      .attr("value","")
      .text("Select category")); 
    $.each(selectProducts, function(key, cctv) { 
      categoryDropdown.append($("<option></option>")
        .attr("value",cctv.id)
        .text(cctv.category)); 
    });
  }
  $('.proceed').hide();
  $('.request').hide();
  grandTotal();

}

jQuery(function() {

  // for addition of Quantity of Cameras
  return $(document).on("keyup",".initialQty", function(){
    var dome = Number(document.getElementById('dome').value);
    
    var bullet = Number(document.getElementById('bullet').value);
    
    var totalqty = (dome + bullet);

    if (totalqty <= 32 && dome <= 32 && bullet <= 32 ) {
      $('#dome-qty').val(dome);
      $('#bullet-qty').val(bullet);
      document.getElementById('totalqty').innerHTML = totalqty;
      $('.connector-qty').val(totalqty);
    } 
    else {
      $('#totalqty').html("Quantity should be less than 32");
     
    }
    
  //for dome
    var priceDome = $('.dome-camera-price').val();
    var total = dome * priceDome;
    var totalLocation = $('.dome-camera-price').parent('td').next('td').next('td').children('.total');
    totalLocation.empty();
    totalLocation.html(total);
  //for bullet
    var priceBullet = $('.bullet-camera-price').val();
    var total = bullet * priceBullet;
    var totalLocation = $('.bullet-camera-price').parent('td').next('td').next('td').children('.total');
    totalLocation.empty();
    totalLocation.html(total);


    for (var i = 3; i <= 5; i++) {
      selectedCategory = $('.'+i).val();
      selectProducts = cctvs[selectedCategory + ":" + i];
      categoryDropdown = $('.1'+i);
      categoryDropdown.empty();
      productPrice = categoryDropdown.parent('td').next('td').children('.price');
      productPrice.empty();
      productQty = categoryDropdown.parent('td').next('td').next('td').children('.qty').val();
      productTotal = categoryDropdown.parent('td').next('td').next('td').next('td').children('.total');
      
        k = 0;
        for (var j = 0; j < selectProducts.length; j++) {
        
          if ((totalqty <= selectProducts[j].category || selectProducts[j].category == "CONNECTOR SET") && (totalqty != 0 && totalqty <= 32)) {
            var category = selectProducts[j].category;
            var id = selectProducts[j].id

            if (selectProducts[j].category == "CONNECTOR SET"){
              categoryDropdown.append($("<option></option>")
                .attr("value",id)
                .text(category)); 
            }
            else{
              categoryDropdown.append($("<option></option>")
                .attr("value",id)
                .text(category + " CHANNEL")); 
            }

            if ((totalqty <= selectProducts[j].category && k == 0) || selectProducts[j].category == "CONNECTOR SET") {
              var price = selectProducts[j].price;
              k++;
            }
          }
          else if((totalqty == 0 || totalqty > 32) && k == 0){
            categoryDropdown.append($("<option></option>")
              .attr("value","")
              .text("Select Quantity above"));
            k++
          }
        } 
      productPrice.val(price);
      if (totalqty == 0 || totalqty > 32) {
        productTotal.html(0);
      }
      else{
        
        var multiTotal = price * totalqty;
        multiTotal = multiTotal.toFixed(2);
        productTotal.html(multiTotal);
      
      }
      
   }
    grandTotal()
  });
  
});

jQuery(function() {

  // for price
  return $(document).on("change",".category-dropdown", function(){
    currentProduct = $(this).parent('td').prev('td').children('.product-name').val();
    selectedCategory = $(this).val();
    productPrice = $(this).parent('td').next('td').children('.price');
    
    if (selectedCategory == "") {
      productPrice.val(0);
    }
    else {
      selectProducts = cctvsPrice[currentProduct + ":" + selectedCategory];
      var price = selectProducts[0].price;
      productPrice.val(price);
    }

    //for total
    var qty = $(this).parent('td').next('td').next('td').children('.qty').val();
    var totalPriceQty = price * Number(qty);
    totalPriceQty = totalPriceQty.toFixed(2);

    $(this).parent('td').next('td').next('td').next('td').children('.total').html(totalPriceQty);
      
    grandTotal();
    proceedButton();
  });
});


// Grand Total all accessiories

function grandTotal(){
  var subtotal = 0;
    $('.total').each(function(i){
        var price = $(this).html();
        if (!isNaN(price)) subtotal += Number(price);
    });
    subtotal = subtotal.toFixed(2);
    $('.grandTotal').html(subtotal);
}

function proceedButton(){
  var categoryDropdown1 = $('.11').val();
  var categoryDropdown2 = $('.12').val();
  var categoryDropdown3 = $('.13').val();
  var categoryDropdown4 = $('.14').val();
  var categoryDropdown5 = $('.15').val();
  var categoryDropdown6 = $('.16').val();
  var categoryDropdown7 = $('.17').val();
  var categoryDropdown8 = $('.18').val();
   if (categoryDropdown1 == "" || categoryDropdown2 == "" || categoryDropdown3 == "" || categoryDropdown4 == "" || categoryDropdown5 == "" || categoryDropdown6 == "" || categoryDropdown7 == "" || categoryDropdown8 == "")  {
    $('.proceed').hide();
   } else {
    $('.proceed').show();
   }
 
}

// for UpperCase Customer Name 
function forUpperCase() {
    var x = document.getElementById('customer-name');
    x.value = x.value.toUpperCase();

}


jQuery(function() {

  // for price
  return $(document).on("keyup",".customer-details", function(){
    var customerName = $('.name').val();
    var customerContact = $('.contact').val();
    var customerEmail = $('.email').val();
    var customerAddress = $('.address').val();
    if (customerName == "" || customerContact == "" || customerEmail == "" || customerAddress == "")  {
      $('.request').hide();
     } else {
      $('.request').show();
     }
  });
});

// for validation
function validate() {
  var contactNumber = $('.contact').val();

  if (contactNumber == "" || isNaN(parseInt(contactNumber)) || !(contactNumber.length == 10)) {
    $('.contact').val(null);
    document.getElementById('cont').style.backgroundColor = "red";
  } 
  else{
    $('#spinner').show();
  }
}

jQuery(function() {

  // for price
  return $(document).on("keyup",".contact", function(){
    var contactNumber = $('.contact').val();
    if (contactNumber.length <= 10) {
      document.getElementById('cont').style.backgroundColor = "white";
      $('.alertInfo').empty();
     
    }
    else if(contactNumber > 10){
      document.getElementById('cont').style.backgroundColor = "red";
      $('.alertInfo').html("Contact No. OutOfRange");
    }
  });
});