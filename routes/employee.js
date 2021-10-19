const employee = require('express').Router();
const Database = require('./database.js');

const db = new Database(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'company_db'
    },
    console.log(`Connected to the database.`)
);

employee.get('/', (req, res) => {
  let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_name
FROM ((employee
INNER JOIN role ON employee.role_id = role.id)
INNER JOIN department ON employee.department_id = department.id);`;
  
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

employee.post('/', (req, res) => {

  console.log(req.body)
  let sql = `INSERT INTO employee (first_name, last_name, role_id, manager_name) 
    VALUES (?, ?, ?, ?)`;

  const { first_name, last_name, role_id, manager_name } = req.body;

  let params = [first_name, last_name, role_id, manager_name];
  let response;

  db.query(sql, params, (err, result) => {
    console.log(params);
    if (err) {
      console.error(err);
      res.status(500).json('Error in posting new role');
      return;
    } else {
      res.status(201).json({
          message: 'success',
          data: req.body
      });
    };
  })
  
});

employee.delete('/:id', (req, res) => {
  let sql = `DELETE FROM employee WHERE id = ?`;
  let params = [req.params.id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
      message: 'Employee not found'
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

module.exports = employee;