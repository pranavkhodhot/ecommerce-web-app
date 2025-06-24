CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255),
    price DECIMAL(10,2),
    description VARCHAR(255),
    stock INTEGER,
    product_image VARCHAR(255)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Products VALUES(1,'Coral Hoodie',20.98,'This Coral hoodie is made of high-quality materials that will keep you warm and comfortable all season long',50,'hoodie-coral');
INSERT INTO Products VALUES(2,'Cyan Hoodie',20.98,'This Cyan hoodie is made of high-quality materials that will keep you warm and comfortable all season long',24,'hoodie-cyan');
INSERT INTO Products VALUES(3,'Grey Hoodie',14.99,'This Grey hoodie is made of high-quality materials that will keep you warm and comfortable all season long',120,'hoodie-grey');
INSERT INTO Products VALUES(4,'Lavender Hoodie',20.98,'This Lavender hoodie is made of high-quality materials that will keep you warm and comfortable all season long',15,'hoodie-lavender');
INSERT INTO Products VALUES(5,'Mint Hoodie',20.98,'This Mint hoodie is made of high-quality materials that will keep you warm and comfortable all season long',25,'hoodie-mint');
INSERT INTO Products VALUES(6,'Orange Hoodie',20.98,'This Orange hoodie is made of high-quality materials that will keep you warm and comfortable all season long',20,'hoodie-orange');
INSERT INTO Products VALUES(7,'Red Hoodie',20.98,'This Red hoodie is made of high-quality materials that will keep you warm and comfortable all season long',35,'hoodie-red');
INSERT INTO Products VALUES(8,'Rose Hoodie',29.98,'This Rose hoodie is made of high-quality materials that will keep you warm and comfortable all season long',80,'hoodie-rose');
INSERT INTO Products VALUES(9,'Royal Blue Hoodie',29.98,'This Royal Blue hoodie is made of high-quality materials that will keep you warm and comfortable all season long',10,'hoodie-royalblue');
INSERT INTO Products VALUES(10,'White Hoodie',14.99,'This White hoodie is made of high-quality materials that will keep you warm and comfortable all season long',60,'hoodie-white');
INSERT INTO Products VALUES(11,'Light Blue Shirt',19.98,'This light blue shirt is made of high-quality materials that will keep you warm and comfortable all season long',37,'shirt-cyan');
INSERT INTO Products VALUES(12,'Lemon Shirt',19.98,'This lemon blue shirt is made of high-quality materials that will keep you warm and comfortable all season long',100,'shirt-lemon');
INSERT INTO Products VALUES(13,'Red Shirt',19.98,'This red shirt is made of high-quality materials that will keep you warm and comfortable all season long',15,'shirt-red');
INSERT INTO Products VALUES(14,'Orange Shirt',19.48,'This orange shirt is made of high-quality materials that will keep you warm and comfortable all season long',50,'shirt-orange');
INSERT INTO Products VALUES(15,'Purple Shirt',19.98,'This purple shirt is made of high-quality materials that will keep you warm and comfortable all season long',75,'shirt-purple');
INSERT INTO Products VALUES(16,'Dark Blue Shirt',19.98,'This dark blue shirt is made of high-quality materials that will keep you warm and comfortable all season long',75,'shirt-blue');
INSERT INTO Products VALUES(17,'White Shirt',9.99,'This white shirt is made of high-quality materials that will keep you warm and comfortable all season long',75,'shirt-white');
INSERT INTO Products VALUES(18,'Sky Shoes',59.99,'These sky shoes is made of high-quality materials that will keep you looking clean all season long',18,'shoes-sky');
INSERT INTO Products VALUES(19,'Bumblebee Shoes',59.99,'These bumblebee shoes is made of high-quality materials that will keep you looking clean all season long',150,'shoes-bumblebee');
INSERT INTO Products VALUES(20,'Violet Shoes',59.99,'These violet shoes is made of high-quality materials that will keep you looking clean all season long',10,'shoes-violet');
INSERT INTO Products VALUES(21,'Blue Shoes',59.49,'These blue shoes is made of high-quality materials that will keep you looking clean all season long',200,'shoes-blue');
INSERT INTO Products VALUES(22,'Grey Shoes',19.98,'These grey shoes is made of high-quality materials that will keep you looking clean all season long',25,'shoes-grey');
CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Categories VALUES(1,'Hoodies');
INSERT INTO Categories VALUES(2,'Shirts');
INSERT INTO Categories VALUES(3,'Shoes');
INSERT INTO Categories VALUES(4,'50% off items');
INSERT INTO Categories VALUES(5,'Pranavs picks');
CREATE TABLE Product_Categories (
    product_id INTEGER,
    category_id INTEGER,
    PRIMARY KEY (product_id, category_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Product_Categories VALUES(1,1);
INSERT INTO Product_Categories VALUES(2,1);
INSERT INTO Product_Categories VALUES(3,1);
INSERT INTO Product_Categories VALUES(4,1);
INSERT INTO Product_Categories VALUES(5,1);
INSERT INTO Product_Categories VALUES(6,1);
INSERT INTO Product_Categories VALUES(7,1);
INSERT INTO Product_Categories VALUES(8,1);
INSERT INTO Product_Categories VALUES(9,1);
INSERT INTO Product_Categories VALUES(10,1);
INSERT INTO Product_Categories VALUES(11,2);
INSERT INTO Product_Categories VALUES(12,2);
INSERT INTO Product_Categories VALUES(13,2);
INSERT INTO Product_Categories VALUES(14,2);
INSERT INTO Product_Categories VALUES(15,2);
INSERT INTO Product_Categories VALUES(16,2);
INSERT INTO Product_Categories VALUES(17,2);
INSERT INTO Product_Categories VALUES(18,3);
INSERT INTO Product_Categories VALUES(19,3);
INSERT INTO Product_Categories VALUES(20,3);
INSERT INTO Product_Categories VALUES(21,3);
INSERT INTO Product_Categories VALUES(22,3);
INSERT INTO Product_Categories VALUES(22,4);
INSERT INTO Product_Categories VALUES(3,4);
INSERT INTO Product_Categories VALUES(10,4);
INSERT INTO Product_Categories VALUES(17,4);
INSERT INTO Product_Categories VALUES(1,5);
INSERT INTO Product_Categories VALUES(3,5);
INSERT INTO Product_Categories VALUES(5,5);
INSERT INTO Product_Categories VALUES(14,5);
INSERT INTO Product_Categories VALUES(17,5);
INSERT INTO Product_Categories VALUES(18,5);
INSERT INTO Product_Categories VALUES(21,5);
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255),
    email_address VARCHAR(255),
    phone_number VARCHAR(255),
    address VARCHAR(255),
    order_date VARCHAR(255),
    total DECIMAL(10,2)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Orders VALUES(1,'Example 1','example@example.com','123456789','123 Colonel By Drive','2024-12-07',20.98);
INSERT INTO Orders VALUES(2,'Test 2','test2@email.com','9876543210','321 Colonel By Drive','2024-12-07',39.97);
INSERT INTO Orders VALUES(3,'Testing Demo','testing@demo.com','1234567891','123 Databases Demo Srteet','2024-12-07',139.96);
INSERT INTO Orders VALUES(4,'Pranav','pranavkhodhot@gmail.com','2899629283','4678 Mcleod Road','2025-03-26',83.95);

CREATE TABLE Order_Items (
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    price_per_item DECIMAL(10,2),
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Order_Items VALUES(1,2,1,20.98);
INSERT INTO Order_Items VALUES(2,11,2,19.98);
INSERT INTO Order_Items VALUES(3,11,1,19.98);
INSERT INTO Order_Items VALUES(3,18,2,59.99);
INSERT INTO Order_Items VALUES(4,2,4,20.98);

