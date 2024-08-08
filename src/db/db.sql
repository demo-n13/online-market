  FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);













ALTER TABLE category ADD COLUMN category_id INT;




ALTER TABLE category ADD CONSTRAINT category_self_join_fk 

FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE;













SELECT * FROM category p LEFT JOIN category ch ON ch.category_id = p.id ORDER BY p.id;