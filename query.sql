CREATE DATABASE blanja;

CREATE TABLE products (
    product_id VARCHAR(50) PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_price INTEGER NOT NULL,
    product_stock INTEGER NOT NULL,
    product_thumbnail VARCHAR(255),
    product_description TEXT,
    product_variants VARCHAR(255),
    user_id VARCHAR(50) NOT NULL,
    category_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories (category_id) ON DELETE CASCADE
);

CREATE TABLE users (
    user_id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_photo VARCHAR(255),
    phone_number VARCHAR(20),
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stores (
    store_name VARCHAR(255) NOT NULL,
    store_description TEXT,
    user_id VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE address (
    address_id VARCHAR(50) PRIMARY KEY,
    address_name VARCHAR(255) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address_type VARCHAR(50) NOT NULL,
    is_default BOOLEAN NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE categories (
    category_id VARCHAR(50) PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

CREATE TABLE carts (
    cart_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    product_id VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL,
    picked_variant VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (product_id) ON DELETE CASCADE
);

CREATE TABLE orders (
    order_id VARCHAR(50) PRIMARY KEY,
    order_status VARCHAR(50) NOT NULL,
    total_price INTEGER NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    delivery_status VARCHAR(50) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE order_items (
    order_item_id VARCHAR(50) PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    product_id VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL,
    product_price INTEGER NOT NULL,
    picked_variant VARCHAR NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (product_id) ON DELETE CASCADE
);