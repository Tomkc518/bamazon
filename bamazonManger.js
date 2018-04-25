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
  start();
});

function start() {
    inquirer
      .prompt({
          type: "list",
          message: "Menu Options",
          choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
          name: "managerMenu"
      })
      .then(function(answer) {
        if (answer.managerMenu === "View Products for Sale") {
          readProducts();
        } else if (answer.managerMenu === "View Low Inventory") {
          console.log("-----------------------------------");
          console.log("ID | Name | Price | Quantity \n")
          connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err, res) {
            if (err) throw err;
              for (var i = 0; i < res.length; i++) {
                console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
              };
            console.log("-----------------------------------");
            restart();
          });
        } else if (answer.managerMenu === "Add to Inventory") {
            updateProduct();
        } else if (answer.managerMenu === "Add New Product") {
            createProduct();
        };
      });
};

function readProducts() {
  console.log("-----------------------------------");
  console.log("Here are the items available to update");
  console.log("ID | Name | Price | Quantity \n")
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    };
  console.log("-----------------------------------");
  restart();
  });
};

function updateProduct() {
  connection.query("SELECT * FROM products", function(err, results) {
  if (err) throw err;
  inquirer
    .prompt([
      {
          name: "updateID",
          type: "input",
          message: "What item's ID would you like to add to?",
      },
      {
          name: "updateQuantity",
          type: "input",
          message: "How many of this item would you like to add?",
      }
      ]).then(function(answer) {
          var chosenItem;
          var quantity; 
          for (var i = 0; i < results.length; i++) {
              if (results[i].item_id === parseInt(answer.updateID)) {
                  chosenItem = results[i];
                  quantity = chosenItem.stock_quantity + parseInt(answer.updateQuantity);
              };
          };
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
              console.log(chosenItem.product_name + " was updated to " + quantity + " items.");
              console.log("-----------------------------------");
              restart();
            }
          );
      });
  });
};

function createProduct() {
  inquirer
    .prompt([
      {
          name: "name",
          type: "input",
          message: "What is the item's name?",
      },
      {
          name: "department",
          type: "input",
          message: "Which Department does it go into?",
      },
      {
          name: "price",
          type: "input",
          message: "How much does it cost?",
      },
      {
          name: "stock",
          type: "input",
          message: "How many of this item do you have?",
      }
      ]).then(function(answer) {
        connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: answer.name,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.stock
          },
          function(err, res) {
            console.log("-----------------------------------");
            console.log(answer.name + " | " + answer.department + " | " + answer.price + " | " + answer.stock + " was added to the database.");
            console.log("-----------------------------------");
            restart();
          })
      });
};

function restart() {
  inquirer
      .prompt({
          name: "startOver",
          type: "confirm",
          message: "Would you like to continue?"
      })
      .then(function(answer) {
          if (answer.startOver === true) {
              start();
          }
          else {
              console.log("-----------------------------------");
              console.log("Thanks for visiting! Get Back to Work!");
              console.log("-----------------------------------");
              connection.end();
          };
      });
};    