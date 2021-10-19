const express = require('express');

const api = require('./routes/index');

// configuring server

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', api);

const departmentRouter = express.Router();

app.use('/department', departmentRouter);

const roleRouter = express.Router();

app.use('/role', roleRouter);

const employeeRouter = express.Router();

app.use('/employee', employeeRouter);

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});