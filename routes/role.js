const role = require('express').Router();
const db = require('./database.js');

role.get('/', (req, res) => {
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

role.post('/', (req, res) => {

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
      res.status(201).json({
          message: 'success',
          data: req.body
      });
    };
  })
  
});

role.delete('/:id', (req, res) => {
  let sql = `DELETE FROM role WHERE id = ?`;
  let params = [req.params.id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
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

module.exports = role;