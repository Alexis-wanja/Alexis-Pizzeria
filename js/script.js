$(document).ready(function() {
  $("#form#pizzacreation").submit(function (event) {
    event.preventDefault();

    let Size, Crust, Toppings, count;
    Size = $("#pizzaSize :selected");
    Crust = $("#pizzaCrust :selected");
    Toppings = $("#pizzaCraft :checked");
    count = parseInt($("#pizzaToppings :checked").val());

    let pizzaOrder = new PizzaOrder(Size, Crust, Toppings, count);
          addToCart(pizzaOrder);
        
        // Display checkout button after placing order
        $("#checkoutBtn").click(function() {
          var delivery = $("#delivery :checked").val();
          var location = $("#deliveryLocation").val()
          var fullCharge = parseInt($("#total-charge").val());

          if(delivery === "deliver") {
            alert ("Thank you for buying your Pizza Planet. Your total charge is"+(fullCharge +200)+" Your delivery is on the way to "+ Location);
          }else {
            alert("Thank you for buying your Pizza Planet. Your total charge is "+fullCharge);
          }
        });

        // Display delivery location after clicking delivery
        $("#yes").click(function() {
          $("#deliveryLocation").hide();
        });
        $("#no").click(function() {
          $("#deliveryLocation").show();
        });
      });

        // Pizza Constructor
        function PizzaOrder(pizzaSize, pizzaCrust, pizzaCraft, pizzaCount) {
          this.size = pizzaSize;
          this.crust = pizzaCrust;
          this.toppings = pizzaCraft; //this is an array
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



  
 

  