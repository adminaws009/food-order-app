const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 8080;

const db = mysql.createConnection({
  host: 'database',
  user: 'root',
  password: 'password',
  database: 'foodOrders'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/place-order', (req, res) => {
  const { name, phone, foodType, quantity } = req.body;
  const itemCost = 12;

  // Calculate total cost
  const totalCost = quantity * itemCost;

  const sql = 'INSERT INTO orders (name, phone, food_type, quantity, item_cost, total_cost) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, phone, foodType, quantity, itemCost, totalCost], (err, result) => {
    if (err) {
      console.error('Error inserting into MySQL:', err);
      res.status(500).send('Error placing order');
      return;
    }

    const orderNumber = result.insertId;
    const successMessage = `Thanks for placing the order! Order Details: Order Number ${orderNumber}, Food Type: ${foodType}, Quantity: ${quantity}, Total Cost: $${totalCost}`;

    console.log(successMessage);

    // Respond with success message and order details
    res.send(successMessage);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
