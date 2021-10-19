const express = require('express');

const api = require('./routes/index');

// configuring server

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', api);

// create a new department
const departmentRouter = express.Router();

app.use('/department', departmentRouter);

const roleRouter = express.Router();

app.use('/role', roleRouter);

const employeeRouter = express.Router();

app.use('/employee', employeeRouter);

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