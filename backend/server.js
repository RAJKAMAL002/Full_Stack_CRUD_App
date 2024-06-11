const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "CrudApp"
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.get('/', (req, res) => {
  const sql = "SELECT * FROM crudapp";
  db.query(sql, (err, data) => {
    if (err) return res.json('err');
    return res.json(data);
  });
});

app.post('/create', (req, res) => {
  const sql = 'INSERT INTO crudapp (name, email) VALUES (?, ?)';
  db.query(sql, [req.body.name, req.body.email], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Failed to insert data' });
    }
    return res.json({ success: true, data: result });
  });
});

app.put('/update/:id', (req, res) => {
  const sql = 'UPDATE crudapp SET name=?, email=? WHERE id=?';
  db.query(sql, [req.body.name, req.body.email, req.params.id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).json({ error: 'Failed to update data' });
    }
    return res.json({ success: true, data: result });
  });
});

app.delete('/delete/:id', (req, res) => {
  const sql = 'delete from crudapp where id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).json({ error: 'Failed to update data' });
    }
    return res.json({ success: true, data: result });
  });
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
