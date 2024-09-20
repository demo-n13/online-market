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


select c.id as id, c.name as name,json_agg(json_build_objet('title',p.title,'price',p.price)) as products from category c inner JOIN product p on p.category_id = c.id group by c.id;

ALTER TABLE category ADD COLUMN category_id INT;

ALTER TABLE category ADD CONSTRAINT category_self_join_fk 
FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE;




SELECT * FROM category p LEFT JOIN category ch ON ch.category_id = p.id ORDER BY p.id;


create TABLE employees(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  salary INT NOT NULL)
create or replace procedure add_employee(
  name VARCHAR(255),
  salary INT)

language plpgsql
AS $$
BEGIN
  INSERT INTO employees(name, salary) VALUES(name, salary);
END;
$$;



create or replace procedure update_employee_salary(
  emp_id INT,
  new_salary decimal(10,2))

language plpgsql
AS $$
BEGIN
  UPDATE employees SET salary = new_salary WHERE id = emp_id;
END;
$$;

call update_employee_salary(1, 5000.00)

select * from employees


create or replace procedure get_employee_info(
  emp_id INT
)
language plpgsql
AS $$
BEGIN
  perform * from employees where id = emp_id;
END;
$$;

call get_employee_info(3);


create or replace procedure get_employee_count()
language  plpgsql
AS
$$
BEGIN
perform count(*) from employees;
END;
$$;

call get_employee_count()


  create or  replace procedure get_highest_paid_employee()
  language  plpgsql
  AS $$
  BEGIN
    perform * from employees ORDER by salary desc limit 1;
  END;
  $$;

call get_highest_paid_employee()


create or replace function reverce_number(num INT,percentage INT)
returns INT
language plpgsql
as
$$
BEGIN
  RETURN (num * percentage) / 100 + num;
END;
$$; 

select reverce_number(100, 50);


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




ALTER TABLE category ADD COLUMN category_id INT;

ALTER TABLE category ADD CONSTRAINT category_self_join_fk 
FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE;


INSERT INTO 



select c.id as id, c.name as name,json_agg(json_build_objet('title',p.title,'price',p.price)) as products from category c inner JOIN product p on p.category_id = c.id group by c.id;

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2),
    category_id INTEGER REFERENCES category(id)
);


CREATE VIEW category_products_view AS
SELECT c.id AS category_id, c.name AS category_name,json_agg( json_build_object('product_id', p.id,'product_name', p.name,'price', p.price)) AS products FROM category c LEFT JOIN product p ON c.id = p.category_id GROUP BY c.id, c.name;






















-- ---------------------------------------------------------------------------------------------------------------------------------------------
-- |                                                                                                                                           |
-- |                                                    E-COMMERCE DATABASE                                                                    |  
-- |                                                                                                                                           |
-- ---------------------------------------------------------------------------------------------------------------------------------------------



CREATE DATABASE E_COMMERCE;

CREATE TABLE category(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  category_id INT,

  FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price INT,
  rating INT NOT NULL,
  category_id INTEGER,
  count INT,
  image_url VARCHAR,

  FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

CREATE TABLE custumers (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  image_url VARCHAR(255),

  UNIQUE(email, phone_number)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  custumer_id INTEGER NOT NULL,
  order_status VARCHAR(255) NOT NULL,

  FOREIGN KEY (custumer_id) REFERENCES custumers(id) ON DELETE CASCADE
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT,
  product_id INT,
  quantity INT NOT NULL,
  price INT NOT NULL,

  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);


CREATE TABLE payments(
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  order_id INT,
  custumer_id INT,
  total_price INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (custumer_id) REFERENCES custumers(id) ON DELETE CASCADE
)

INSERT INTO category (name,image_url) VALUES ('laptop','laptop.png'),('mobile','mobile.png');

INSERT INTO products (title,description,price,rating,category_id,count,image_url) VALUES ('laptop','laptop',1000,5,1,10,'laptop.png'),('mobile','mobile',1000,5,2,10,'mobile.png');

INSERT INTO custumers (full_name,email,phone_number,password) VALUES ('ali','ali@ali','123456789','123456789'),('reza','reza@reza','123456789','123456789');

INSERT INTO orders (created_at,custumer_id,order_status) VALUES (now(),23,'pending'),(now(),24,'completed');

INSERT INTO order_items (order_id,product_id,quantity,price) VALUES (23,1,2,1000),(24,2,2,1000);

  INSERT INTO payments (created_at,order_id,custumer_id,total_price) VALUES (now(),23,23,2000),(now(),24,24,2000)