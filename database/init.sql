-- Create a table for storing orders
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  food_type VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  item_cost DECIMAL(10, 2) NOT NULL,
  total_cost DECIMAL(10, 2) NOT NULL
);

-- Insert some initial data
INSERT INTO orders (name, phone, food_type, quantity, item_cost, total_cost)
VALUES
  ('John Doe', '123-456-7890', 'Pizza', 2, 12.00, 24.00),
  ('Jane Smith', '987-654-3210', 'Burger', 1, 8.00, 8.00);