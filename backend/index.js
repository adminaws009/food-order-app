const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 8080;

const db = mysql.createConnection({
  host: 'mysql',
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
  const foodType = req.body.foodType;
  const quantity = req.body.quantity;

  const sql = 'INSERT INTO orders (food_type, quantity) VALUES (?, ?)';
  db.query(sql, [foodType, quantity], (err, result) => {
    if (err) {
      console.error('Error inserting into MySQL:', err);
      return;
    }

    console.log(`Order placed for ${quantity} ${foodType}(s).`);

    // Redirect to the home page after placing the order
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
