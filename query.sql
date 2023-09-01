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
    seller_password VARCHAR,
    seller_fullname VARCHAR,
    seller_phone VARCHAR,
    store_name VARCHAR,
    store_description TEXT,
    role VARCHAR
);

CREATE TABLE customer(
    customer_id VARCHAR PRIMARY KEY,
    customer_email VARCHAR NOT NULL,
    customer_password VARCHAR,
    customer_fullname VARCHAR,
    customer_address VARCHAR,
    customer_phone VARCHAR,
    role VARCHAR
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

CREATE TABLE address(
    address_id VARCHAR PRIMARY KEY,
    address_name VARCHAR,
    posttal_code VARCHAR,
    city VARCHAR,
    save_address_as VARCHAR,
    customer_id VARCHAR
);
