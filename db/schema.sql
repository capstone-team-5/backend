DROP DATABASE IF EXISTS cart_dev;

CREATE DATABASE cart_dev;

\c cart_dev;

CREATE TABLE store (
    store_id SERIAL PRIMARY KEY,
    store_name TEXT NOT NULL,
    store_address TEXT NOT NULL,
    store_city TEXT NOT NULL,
    store_state TEXT NOT NULL,
    store_zipCode INTEGER NOT NULL,
    store_latitude DOUBLE PRECISION NOT NULL,
    store_longitude DOUBLE PRECISION NOT NULL,
    store_image TEXT,
    store_hours TEXT NOT NULL,
    store_accepts_EBT BOOLEAN DEFAULT true,
    store_phone_number TEXT NOT NULL
);dfd

CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,
    product_name TEXT NOT NULL,
    product_image TEXT NOT NULL,
    product_description TEXT,
    product_category TEXT NOT NULL,
    product_weight DECIMAL(6,2) DEFAULT 0 CHECK (product_weight >= 0),
    product_unit TEXT,
    product_brand TEXT,
    product_is_tree_nuts_free BOOLEAN DEFAULT false,
    product_is_egg_free BOOLEAN DEFAULT false,
    product_is_fresh BOOLEAN DEFAULT false,
    product_is_frozen BOOLEAN DEFAULT false,
    product_is_halal BOOLEAN DEFAULT false,
    product_is_kosher BOOLEAN DEFAULT false,
    product_is_non_processed BOOLEAN DEFAULT false,
    product_is_organic BOOLEAN DEFAULT false,
    product_is_vegetarian BOOLEAN DEFAULT false,
    product_is_stock BOOLEAN DEFAULT true,
    product_is_vegan_friendly BOOLEAN DEFAULT false,
    product_is_seafood BOOLEAN DEFAULT false,
    product_is_peanut_free BOOLEAN DEFAULT false,
    product_is_caffeine BOOLEAN DEFAULT false,
    product_is_dairy_free BOOLEAN DEFAULT false ,
    product_is_no_preservatives BOOLEAN DEFAULT false,
    product_is_no_added_sugar BOOLEAN DEFAULT false,
    product_is_nuts_free BOOLEAN DEFAULT false,
    product_is_keto_friendly BOOLEAN DEFAULT false,
    product_is_low_carb_diet BOOLEAN DEFAULT false,
    product_is_gluten_free BOOLEAN DEFAULT false,
    product_is_international BOOLEAN DEFAULT false
);

CREATE TABLE store_product (
    store_product_id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES product ON DELETE CASCADE,
    store_id INTEGER NOT NULL REFERENCES store ON DELETE CASCADE,
    product_price DECIMAL(6,2) NOT NULL DEFAULT 0 CHECK (product_price >= 0),
    product_discount DECIMAL(4,2) DEFAULT 0 CHECK (product_discount >= 0)
);

CREATE TABLE shopper(
  shopper_firebase_uid TEXT PRIMARY KEY UNIQUE NOT NULL,
  shopper_email VARCHAR(255) UNIQUE NOT NULL,
  shopper_first_name VARCHAR(255) NOT NULL,
  shopper_last_name VARCHAR(255) NOT NULL
);

CREATE TABLE review (
    review_id SERIAL PRIMARY KEY,
    shopper_firebase_uid TEXT NOT NULL REFERENCES shopper ON DELETE CASCADE,
    store_id INTEGER NOT NULL REFERENCES store ON DELETE CASCADE,
    review_rating NUMERIC NOT NULL CHECK (review_rating >= 1 AND review_rating <= 5),
    review_comment TEXT,
    review_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorite (
    shopper_firebase_uid TEXT NOT NULL REFERENCES shopper,
    product_id INTEGER NOT NULL REFERENCES product,
    PRIMARY KEY (shopper_firebase_uid, product_id)
);

CREATE TABLE saving (
    saving_id SERIAL PRIMARY KEY,
    shopper_firebase_uid TEXT NOT NULL REFERENCES shopper ON DELETE CASCADE,
    saving_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    store_name TEXT NOT NULL,
    saving_per_trip DECIMAL(6,2) NOT NULL DEFAULT 0 CHECK (saving_per_trip >= 0),
    saving_total DECIMAL(10,2) DEFAULT 0 CHECK (saving_total >= 0)
);

CREATE TABLE location (
    location_id SERIAL PRIMARY KEY,
    location_zipCode INTEGER NOT NULL,
    location_latitude DOUBLE PRECISION NOT NULL,
    location_longitude DOUBLE PRECISION NOT NULL,
    location_name TEXT NOT NULL
);

--  on delete cascade tells postgres to also delete the row in the child table ,if the corresponding row in products is deleted

-- CREATE TABLE shopper ( do not delete - future iteration for account settings
--   shopper_firebase_uid TEXT PRIMARY KEY UNIQUE NOT NULL,
--   shopper_email VARCHAR(255) UNIQUE NOT NULL,
--   shopper_first_name VARCHAR(255) NOT NULL,
--   shopper_last_name VARCHAR(255) NOT NULL,
--   shopper_profile_pic TEXT,
--   shopper_instagram_link TEXT,
--   shopper_facebook_link TEXT,
--   shopper_dietary_preferences TEXT[]
-- );
