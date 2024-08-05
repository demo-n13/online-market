CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL
);

CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price INT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  rating INT NOT NULL,
  category_id INT,

  FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);
