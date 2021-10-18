const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

// configuring server

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connection to database

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'company_db'
    },
    console.log(`Connected to the database.`)
);

// create a new department

app.post('/api/new-department', ({ body }, res) => {
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

// read all departments
app.get('/api/department', (req, res) => {
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

// delete a department

app.delete('/api/department/:id', (req, res) => {
  let sql = `DELETE FROM department WHERE id = ?`;
  let params = [req.params.id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
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

// create new role
app.post('/api/role', (req, res) => {

  console.log(req.body)
  let sql = `INSERT INTO role (title, salary, department_id) 
    VALUES (?, ?, ?)`;

  const { title, salary, department_id } = req.body;

  let params = [title, salary, department_id];
  let response;

  db.query(sql, params, (err, result) => {
    console.log(params);
    if (err) {
      console.error(err);
      res.status(500).json('Error in posting new role');
      return;
    } else {
      response = {
        message: 'Success',
        data: req.body,
      }
      res.status(201).json(response);
    };
  })
  
});
// read all roles
app.get('/api/role', (req, res) => {
  let sql = `SELECT * FROM role`;
  
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
// delete a role
app.delete('/api/role/:id', (req, res) => {
  let sql = `DELETE FROM role WHERE id = ?`;
  let params = [req.params.id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
      message: 'Role not found'
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
// create new employee
// app.post('/api/new-role', ({ body }, res) => {
//   const sql = `INSERT INTO role (name)
//   VALUES (?)`;
//   const params = [body.name];

//   db.query(sql, params, (err, res) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     } else {
//       res.json({
//         message: 'success',
//         data: body
//       });
//     };
//   });
// });
// read all employees
// delete an employee


// error response page
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});