/* -------------------------------------
 * ------ MICRODB MERCADOLIBRE ---------
 * -------------------------------------
 * 
 * 
 * ========= DDL =============
 */

-- DATABASE
DROP DATABASE IF EXISTS microdb_mercadolibre;

CREATE DATABASE microdb_mercadolibre;

USE microdb_mercadolibre;

-- TABLES
DROP TABLE IF EXISTS products_details;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS sellers;
DROP TABLE IF EXISTS users_addresses_details;
DROP TABLE IF EXISTS users_addresses;
DROP TABLE IF EXISTS users_details;
DROP TABLE IF EXISTS users;

-- ---------------------------------------------------------------------------

-- ======= Tabla users ===========
CREATE TABLE users(
    id INT(12) AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    identification_type VARCHAR(15) NOT NULL,
    identification_number VARCHAR(20) NOT NULL,
    country_id VARCHAR(10) NOT NULL,
    creation_date DATETIME NOT NULL,
    update_date DATETIME NOT NULL
);

-- ======= Restricciones Tabla users ===========
ALTER TABLE users 
ADD CONSTRAINT UNIQUE_users_id UNIQUE(id);

ALTER TABLE users 
ADD CONSTRAINT UNIQUE_users_first_last_name UNIQUE(first_name, last_name);

ALTER TABLE users 
ADD CONSTRAINT UNIQUE_users_identification UNIQUE(identification_type, identification_number);

ALTER TABLE users
ADD CONSTRAINT CHECK_users_update_date CHECK (update_date >= creation_date);

-- ---------------------------------------------------------------------------

-- ======= Tabla users_details ===========
CREATE TABLE users_details(
    id INT(12) AUTO_INCREMENT PRIMARY KEY,
    user_id INT(12) NOT NULL,
    contact VARCHAR(50) DEFAULT NULL,
    phone VARCHAR(50) NOT NULL,
    alternative_phone VARCHAR(50) DEFAULT NULL,
    user_type VARCHAR(50) NOT NULL,
    points INT(10) NOT NULL,
    site_id VARCHAR(10) NOT NULL,
    permalink VARCHAR(50) NOT NULL,
    creation_date DATETIME NOT NULL,
    update_date DATETIME NOT NULL
);

-- ======= Restricciones Tabla users_details ===========
ALTER TABLE users_details 
ADD CONSTRAINT UNIQUE_users_details_id UNIQUE(id);

ALTER TABLE users_details 
ADD CONSTRAINT FK_users_details_user_id
FOREIGN KEY(user_id) REFERENCES users(id)
ON DELETE CASCADE;

ALTER TABLE users_details 
ADD CONSTRAINT UNIQUE_users_details_phone_user UNIQUE(phone, alternative_phone);

ALTER TABLE users_details
ADD CONSTRAINT CHECK_users_details_update_date CHECK (update_date >= creation_date);

-- ---------------------------------------------------------------------------

-- ======= Tabla users_addresses ===========
CREATE TABLE users_addresses(
    id INT(12) AUTO_INCREMENT PRIMARY KEY,
    user_id INT(12) NOT NULL,
    address_line VARCHAR(100) NOT NULL,
    floor VARCHAR(50) DEFAULT NULL,
    apartment VARCHAR(50) DEFAULT NULL,
    street_number VARCHAR(20) NOT NULL,
    street_name VARCHAR(100) NOT NULL,
    zip_code VARCHAR(50) DEFAULT NULL,
    city_id VARCHAR(255) DEFAULT NULL,
    city_name VARCHAR(50) DEFAULT NULL,
    creation_date DATETIME NOT NULL,
    update_date DATETIME NOT NULL
);

-- ======= Restricciones Tabla users_addresses ===========
ALTER TABLE users_addresses 
ADD CONSTRAINT UNIQUE_users_addresses_id UNIQUE(id);

ALTER TABLE users_addresses 
ADD CONSTRAINT FK_users_addresses_user_id
FOREIGN KEY(user_id) REFERENCES users(id)
ON DELETE CASCADE;

ALTER TABLE users_addresses
ADD CONSTRAINT CHECK_users_addresses_update_date CHECK (update_date >= creation_date);

-- ---------------------------------------------------------------------------

-- ======= Tabla users_addresses_details ===========
CREATE TABLE users_addresses_details(
    id INT(12) AUTO_INCREMENT PRIMARY KEY,
    user_address_id INT(12) NOT NULL,
    state_id VARCHAR(255) DEFAULT NULL,
    state_name VARCHAR(50) DEFAULT NULL,
    country_id VARCHAR(255) DEFAULT NULL,
    country_name VARCHAR(50) DEFAULT NULL,
    neighborhood_id VARCHAR(255) DEFAULT NULL,
    neighborhood_name VARCHAR(50) DEFAULT NULL,
    municipality_id VARCHAR(255) DEFAULT NULL,
    municipality_name VARCHAR(50) DEFAULT NULL,
    geolocation_type VARCHAR(100) DEFAULT NULL,
    latitude VARCHAR(100) DEFAULT NULL,
    longitude VARCHAR(100) DEFAULT NULL,
    creation_date DATETIME NOT NULL,
    update_date DATETIME NOT NULL
);

-- ======= Restricciones Tabla users_addresses_details ===========
ALTER TABLE users_addresses_details 
ADD CONSTRAINT UNIQUE_users_address_details_id UNIQUE(id);

ALTER TABLE users_addresses_details 
ADD CONSTRAINT FK_users_address_details_user_address_id
FOREIGN KEY(user_address_id) REFERENCES users_addresses(id)
ON DELETE CASCADE;

ALTER TABLE users_addresses_details
ADD CONSTRAINT CHECK_users_addresses_details_update_date CHECK (update_date >= creation_date);

-- ---------------------------------------------------------------------------

-- ======= Tabla sellers ===========
CREATE TABLE sellers(
    id INT(12) AUTO_INCREMENT PRIMARY KEY,
    user_id INT(12) NOT NULL,
    status_billing_allow BOOLEAN NOT NULL,
    status_buy_allow BOOLEAN NOT NULL,
    status_sell_action_allow BOOLEAN NOT NULL,
    mercadopago_account_type VARCHAR(50) DEFAULT NULL,
    mercadopago_tc_accepted VARCHAR(50) DEFAULT NULL,
    site_status VARCHAR(50) DEFAULT NULL,
    shopping_cart_buy VARCHAR(50) DEFAULT NULL,
    shopping_cart_sell VARCHAR(50) DEFAULT NULL,
    inmediate_payment VARCHAR(50) DEFAULT NULL,
    shipping_market VARCHAR(50) DEFAULT NULL,
    creation_date DATETIME NOT NULL,
    update_date DATETIME NOT NULL
);

-- ======= Restricciones Tabla sellers ===========
ALTER TABLE sellers 
ADD CONSTRAINT UNIQUE_sellers_id UNIQUE(id);

ALTER TABLE sellers 
ADD CONSTRAINT FK_sellers_id
FOREIGN KEY(user_id) REFERENCES users(id)
ON DELETE CASCADE;

ALTER TABLE sellers
ADD CONSTRAINT CHECK_sellers_update_date CHECK (update_date >= creation_date);

-- ---------------------------------------------------------------------------

-- ======= Tabla products ===========
CREATE TABLE products(
    id INT(12) AUTO_INCREMENT PRIMARY KEY,
    site_id VARCHAR(20) NOT NULL,
    title VARCHAR(100) NOT NULL,
    subtitle VARCHAR(100) DEFAULT NULL,
    seller_id INT(20) NOT NULL,
    category_id VARCHAR(100) NOT NULL,
    official_store_id VARCHAR(100) DEFAULT NULL,
    price DECIMAL(6,3) NOT NULL,
    base_price DECIMAL(6,3) NOT NULL,
    original_price DECIMAL(6,3) NOT NULL,
    initial_quantity DECIMAL(6,3) NOT NULL,
    available_quantity DECIMAL(6,3) NOT NULL,
    creation_date DATETIME NOT NULL,
    update_date DATETIME NOT NULL
);

-- ======= Restricciones Tabla products ===========
ALTER TABLE products 
ADD CONSTRAINT UNIQUE_products_id UNIQUE(id);

ALTER TABLE products 
ADD CONSTRAINT FK_products_seller_id 
FOREIGN KEY(seller_id) REFERENCES sellers(id)
ON DELETE CASCADE;

ALTER TABLE products
ADD CONSTRAINT CHECK_products_update_date CHECK (update_date >= creation_date);

-- ---------------------------------------------------------------------------

-- ======= Tabla products_details ===========
CREATE TABLE products_details(
    id INT(12) AUTO_INCREMENT PRIMARY KEY,
    product_id INT(12) NOT NULL,
    description VARCHAR(500),
    status VARCHAR(20) NOT NULL,
    warranty VARCHAR(20) NOT NULL,
    sold_quantity INT(10) DEFAULT NULL,
    buyind_mode VARCHAR(50) DEFAULT NULL,
    listing_type_id VARCHAR(50) DEFAULT NULL,
    product_condition VARCHAR(50) DEFAULT NULL,
    permalink VARCHAR(500) DEFAULT NULL,
    thumbnail_id VARCHAR(500) DEFAULT NULL,
    thumbnail VARCHAR(500) DEFAULT NULL,
    secure_thumbnail VARCHAR(500) DEFAULT NULL,
    creation_date DATETIME NOT NULL,
    update_date DATETIME NOT NULL,
    stop_time DATETIME NOT NULL
);

-- ======= Restricciones Tabla products_details ===========
ALTER TABLE products_details 
ADD CONSTRAINT UNIQUE_products_details_id UNIQUE(id);

ALTER TABLE products_details 
ADD CONSTRAINT FK_products_details_product_id 
FOREIGN KEY(product_id) REFERENCES products(id)
ON DELETE CASCADE;

ALTER TABLE products_details
ADD CONSTRAINT CHECK_products_details_update_date CHECK (update_date >= creation_date); 