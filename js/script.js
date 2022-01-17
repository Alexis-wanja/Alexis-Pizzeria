$(document).ready(function() {
  $("#order-details").hide();
  $("#deliver").hide();

  var totalPriceArray = [];
  class Order {
  constructor(size, crust, toppings, amount) {
    this.size = size;
    this.crust = crust;
    this.toppings = toppings;
    this.pizzaPrice = 0;
    this.amount = amount;
  }
  pizzaCost() {
    if (this.size === "small-pizza") {
      this.pizzaPrice += 300;
    } else if (this.size === "medium-pizza") {
      this.pizzaPrice += 500;
    } else if (this.size === "large-pizza") {
      this.pizzaPrice += 1000;
    }
    if (this.crust === "crispy-crust") {
      this.pizzaPrice += 300;
    } else if (this.crust === "gluten-free") {
      this.pizzaPrice += 500;
    } else if (this.crust === "stuffed-crust") {
      this.pizzaPrice += 400;
    } else if (this.crust === "thin-crust") {
      this.pizzaPrice += 100;
    } else if (this.crust === "cheese-crust") {
      this.pizzaPrice += 700;
    }
    if (this.toppings === "onions") {
      this.pizzaPrice += 30;
    } else if (this.toppings === "mushrooms") {
      this.pizzaPrice += 200;
    } else if (this.toppings === "broccoli") {
      this.pizzaPrice += 100;
    } else if (this.toppings === "tuna") {
      this.pizzaPrice += 80;
    } else if (this.toppings === "potato") {
      this.pizzaPrice += 70;
    } else if (this.toppings === "pepperoni") {
      this.pizzaPrice += 130;
    }else if (this.toppings === "bacon") {
      this.pizzaPrice += 80;
    }else if (this.toppings === "beef") {
      this.pizzaPrice += 50;
    }
  }
  finalCost() {
    var cartTotalPrice = [];
    for (var arrayElement = 0; arrayElement < totalPriceArray.length; arrayElement++) {
      cartTotalPrice += totalPriceArray[arrayElement];
    }
    return cartTotalPrice;
  }
}
class Address {
constructor(address) {
  this.address = address;
  this.deliveryAddress = (address);
}
}



  $(".btn.check-out").click(function() {
  });
  $("form#menu").submit(function(event) {
    event.preventDefault();
    var size = $("select#size").val();
    var crust = $("select#crust").val();
    var toppings = $("select#toppings").val();
    var pizzaDetails = (size + " - " + crust + " - " + toppings);
    var newPizzaOrder = new Order(size, crust, toppings);
    newPizzaOrder.pizzaCost();
    totalPriceArray.push(newPizzaOrder.pizzaPrice);
    $("#final-cost").text(newPizzaOrder.finalCost());
    $("#pizza-details").append("<ul><li>" + pizzaDetails + "</li></ul>");
  });
  $("#submit-pizza").click(function() {
    $("#deliver").toggle();
  });

  $("#checkout-btn").click(function() {
    $("#order-details").toggle();
  });
  $("form#address-form").submit(function(event) {
    $(".address-form").toggle();
    event.preventDefault();
    var address = $("input#location").val();
    var newAddress = new Address(address);
    $("#delivery-option").text("Your pizza will arrive soon at: " + newAddress.deliveryAddress);
  });
})





