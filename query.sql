CREATE DATABASE blanja;

CREATE TABLE products(
    product_id VARCHAR PRIMARY KEY,
    product_name VARCHAR NOT NULL,
    product_price INT NOT NULL,
    product_stock INT NOT NULL,
    product_photo VARCHAR NOT NULL,
    product_description TEXT NOT NULL,
    product_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category_id VARCHAR,
    seller_id VARCHAR
);

------------------------------------------------------------
CREATE TABLE seller(
    seller_id VARCHAR PRIMARY KEY,
    seller_email VARCHAR NOT NULL,
    seller_password VARCHAR NOT NULL,
    seller_fullname VARCHAR NOT NULL,
    seller_phone VARCHAR,
    store_name VARCHAR,
    store_description TEXT,
    role VARCHAR
);

CREATE TABLE customer(
    customer_id VARCHAR PRIMARY KEY,
    customer_email VARCHAR NOT NULL,
    customer_password VARCHAR NOT NULL,
    customer_fullname VARCHAR NOT NULL,
    role VARCHAR,
    customer_address VARCHAR,
    customer_phone VARCHAR
);

------------------------------------------------------------
CREATE TABLE category(
    category_id VARCHAR PRIMARY KEY,
    category_name VARCHAR NOT NULL
);

------------------------------------------------------------
CREATE TABLE orders(
    order_id VARCHAR PRIMARY KEY,
    customer_id VARCHAR,
    seller_id VARCHAR,
    product_id VARCHAR,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

ALTER TABLE orders ADD FOREIGN KEY (product_id) REFERENCES products(products_id);

SELECT orders.*,products.* FROM orders JOIN products ON orders.product_id = products.product_id WHERE orders.customer_id = '603e863e-9d2d-4184-9c7f-972274135653';