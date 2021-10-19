const department = require('express').Router();
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'company_db'
    },
    console.log(`Connected to the database.`)
);

department.get('/', (req, res) => {
  let sql = `SELECT id, name FROM department`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

department.post('/', ({ body }, res) => {
  let sql = `INSERT INTO department (name)
  VALUES (?)`;
  let params = [body.name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    } else {
      res.json({
        message: 'success',
        data: body
      });
    };
  });
});

department.delete('/:id', (req, res) => {
  let sql = `DELETE FROM department WHERE id = ?`;
  let params = [req.params.id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
      message: 'Department not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

module.exports = department;