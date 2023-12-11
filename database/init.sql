-- Create a table for storing orders
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  food_type VARCHAR(255) NOT NULL,
  quantity INT NOT NULL
);
