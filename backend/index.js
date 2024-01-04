const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 8080;

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'database.foodapp-namespace',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1); // Exit the process if unable to connect to the database
  }
  console.log('Connected to MySQL database');
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/backend/place-order', async (req, res) => {
  try {
    const { name, phone, foodType, quantity } = req.body;
    const itemCost = 12;

    // Calculate total cost
    const totalCost = quantity * itemCost;

    const sql = 'INSERT INTO orders (name, phone, food_type, quantity, item_cost, total_cost) VALUES (?, ?, ?, ?, ?, ?)';
    const result = await db.promise().query(sql, [name, phone, foodType, quantity, itemCost, totalCost]);

    const orderNumber = result[0].insertId;
    const successMessage = `Thanks for placing the order! Order Details: Order Number ${orderNumber}, Food Type: ${foodType}, Quantity: ${quantity}, Total Cost: $${totalCost}`;

    console.log(successMessage);

    // Respond with success message and order details
    res.send(successMessage);
  } catch (err) {
    console.error('Error inserting into MySQL:', err);
    res.status(500).send('Error placing order');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
