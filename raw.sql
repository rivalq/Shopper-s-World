

START TRANSACTION; 
INSERT INTO marketplace (name, brand, category, short_description,long_description,seller) VALUES ("j", "j", "j", "j", "j", "rivalq"); 
SELECT MAX(cloth_id) FROM marketplace; 
COMMIT;    
