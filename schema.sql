DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2),
  stock_quantity INT,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Last Empire", "Books", 12.23, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Star Trek III", "Movies", 7.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fire TV", "Video Products", 44.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("French Laundry Stripe Pillow", "Home Decor", 39.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Organic Onion Powder", "Grocery", 10.00, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gillette Fusion", "Men's Grooming", 32.99, 175);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hot Wheels", "Toys & Games", 15.99, 125);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Printed Maxi Dress", "Women's Clothing", 98.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cuff Bracelet Gift", "Homemade Jewelry", 24.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Titan WarriorCord", "Hunting", 17.94, 20);