// Capture form data
$(document).ready(function () {
    $("form#menu").submit(function (event) {
      event.preventDefault();

      let size, crust, toppings, count;
      size = $("#Size :selected");
      crust = $("#Crust :selected");
      toppings = $("#Toppings :checked");
      count = parseInt($("#Toppings :checked").val());
    
    // Display checkout button after placing order
    $("#checkoutBtn").click(function() {
      var delivery = $("#delivery :checked").val();
      var location = $("#deliveryLocation").val()
      var fullCharge = parseInt($("#total-charge").val());

      if(delivery === "deliver") {
        alert ("Thank you for buying at Pizza Planet. Your total charge is"+(fullCharge +500)+" Your delivery is on the way to "+ location);
      }else {
        alert("Thank you for buying at Pizza Planet. Your total charge is "+fullCharge);
      }
    });

    // Display delivery location after clicking delivery
    $("#no").click(function() {
      $("#Location").hide();
    });
    $("#yes").click(function() {
      $("#Location").show();
    });
  });

    // Pizza Constructor
    function PizzaOrder(Size, Crust, Toppings, pizzaCount) {
      this.size = Size;
      this.crust = Crust;
      this.toppings = Toppings; //this is an array
      this.count = pizzaCount;
  }

  //create a get price prototype
  PizzaOrder.prototype.getPrice = function () {
    let sizePrice, crustPrice, toppingsPrice;
    sizePrice = parseInt(this.size.val());
    crustPrice = parseInt(this.crust.val());
    toppingsPrice = this.toppings.map(function() {
      return parseInt($(this).val());
    })

    let totalPriceForToppings = 0;
    for(let i=0; i<toppingsPrice.length; i++){
      totalPriceForToppings += toppingsPrice[i];
    }

    letPriceOfOrder = (sizePrice + crustPrice + totalPriceForToppings) * this.count;
    return letPriceOfOrder;
  };

  // Add pizza to cart
  function addToCart(order) {
    let toppings = order.toppings.map(function(){
      return this.id;
    })
    .get()
    .join();
    $("#pizzaCart tablebody").append(`<tr>
                              <td>${order.size.html()}</td>
                              <td>${order.crust.html()}</td>
                              <td>${toppings}</td>
                              <td>${order.getPrice()}</td>
                            </tr>`);

    var currentTotalCharge = parseInt($("#total-charge").html());
    $("#total-charge").html(currentTotalCharge + order.getPrice());
    $("#checkoutBtn").show();
    $("#delivery").show();
  }

});

