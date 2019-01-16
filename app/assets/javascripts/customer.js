// for dropdown
function productValues(){
  for (var i = 0; i < 8; i++ ) {
    var categoryId = i+1;
    category = $('.'+categoryId).val();
    productName = categoryId;
    selectProducts = cctvs[category + ":" + productName];
    categoryDropdown = $('.1'+categoryId);
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
    $('#dome-qty').val(dome);
    var bullet = Number(document.getElementById('bullet').value);
    $('#bullet-qty').val(bullet);
    var totalqty = (dome + bullet);
    document.getElementById('totalqty').innerHTML = totalqty;
    $('.connector-qty').val(totalqty);

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
        
          if ((totalqty <= selectProducts[j].category && totalqty != 0) || selectProducts[j].category == "CONNECTOR SET") {
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
        } 
      productPrice.val(price);

      if (selectedCategory == "CONNECTOR") {
        var multiPriceQty = price * totalqty;
        productTotal.html(multiPriceQty);
      } 
      else {
        var multiPriceQty = price * productQty;
        productTotal.html(multiPriceQty);
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
    var totalPriceQty = price * qty;
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
}

jQuery(function() {

  // for price
  return $(document).on("keyup",".contact", function(){
    var contactNumber = $('.contact').val();
    if (contactNumber.length == 10) {
      document.getElementById('cont').style.backgroundColor = "white";
     
    }
  });
});