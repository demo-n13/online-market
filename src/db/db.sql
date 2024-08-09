CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL
);


ALTER TABLE category ADD COLUMN category_id INT;

ALTER TABLE category ADD CONSTRAINT category_self_join_fk 
FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE;



CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price INT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  rating INT NOT NULL,
  category_id INT,
  count INT,

  FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);


CREATE TABLE customer (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  phone_number VARCHAR(13) UNIQUE NOT NULL,
  password VARCHAR(56) NOT NULL,
  image_url VARCHAR(255)
);



CREATE TYPE order_status AS ENUM ('canceled', 'pending', 'completed', 'payed');


CREATE TABLE orders (
  id SERIAL PRIMARY KEY ,
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  order_status order_status DEFAULT 'pending',
  customer_id INT,

  FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE
);


CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  quantity INT NOT NULL,
  price INT NOT NULL,
  product_id INT NOT NULL,
  order_id INT NOT NULL,

  FOREIGN KEY (product_id) 
  REFERENCES product(id) 
  ON DELETE CASCADE 
  ON UPDATE NO ACTION,

  FOREIGN KEY (order_id) 
  REFERENCES orders(id) 
  ON DELETE CASCADE 
  ON UPDATE NO ACTION
);



CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  total_price DECIMAL(20, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  customer_id INT NOT NULL,
  order_id INT NOT NULL,

  FOREIGN KEY (customer_id) 
  REFERENCES customer(id) 
  ON DELETE CASCADE 
  ON UPDATE NO ACTION,

  FOREIGN KEY (order_id) 
  REFERENCES orders(id) 
  ON DELETE CASCADE 
  ON UPDATE NO ACTION
);

























-- CREATE TABLE category_update_log (
--   category_id INT,
--   old_category_name VARCHAR(255),
--   old_category_image_url VARCHAR(255),
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE OR REPLACE FUNCTION category_update_trg_fn () 
-- RETURNS TRIGGER
-- LANGUAGE plpgsql
-- AS
-- $$
-- BEGIN

-- INSERT INTO category_update_log(category_id, old_category_name, old_category_image_url) VALUES (OLD.id, OLD.name, OLD.image_url);

-- RETURN NEW;

-- END;
-- $$;

-- CREATE TRIGGER category_update_trg
-- BEFORE UPDATE
-- ON category
-- FOR EACH ROW
-- EXECUTE PROCEDURE category_update_trg_fn();


