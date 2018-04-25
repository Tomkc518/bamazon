var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  readProducts();
  start();
});

function readProducts() {
    console.log("-----------------------------------");
    console.log("Here are the items available to purchase...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
      };
    console.log("-----------------------------------");
    });
};

function start() {
    connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
            name: "purchaseID",
            type: "input",
            message: "What item's ID would you like to purchase?",
        },
        {
            name: "purchaseQuantity",
            type: "input",
            message: "How many of this item would you like?",
        }
        ]).then(function(answer) {
            var chosenItem;
            var quantity; 
            var cost;
            for (var i = 0; i < results.length; i++) {
                if (results[i].item_id === parseInt(answer.purchaseID)) {
                    chosenItem = results[i];
                    quantity = chosenItem.stock_quantity - parseInt(answer.purchaseQuantity);
                    cost = parseInt(answer.purchaseQuantity) * chosenItem.price;
                };
            };
            if (quantity <= 0){
                console.log("-----------------------------------");
                console.log("Sorry, Insufficient Quantity!");
                console.log("-----------------------------------");
                restart();
            } else {
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                      {
                        stock_quantity: quantity
                      },
                      {
                        item_id: chosenItem.item_id
                      }
                    ],
                    function(error) {
                      if (error) throw err;
                      console.log("-----------------------------------");
                      console.log("Total Amount Due: " + cost.toFixed(2));
                      console.log("-----------------------------------");
                      restart();
                    }
                  );
            };
        });
    });
};

function restart() {
    inquirer
        .prompt({
            name: "startOver",
            type: "confirm",
            message: "Would you like to continue shopping?"
        })
        .then(function(answer) {
            if (answer.startOver === true) {
                readProducts();
                start();
            }
            else {
                console.log("-----------------------------------");
                console.log("Thanks for visiting! Come back soon!");
                console.log("-----------------------------------");
                connection.end();
            };
        });
};