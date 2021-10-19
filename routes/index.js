express = require('express');

departmentRouter = require('./department.js');
roleRouter = require('./role.js');
employeeRouter = require('./employee.js')

app = express();

app.use('/department', departmentRouter);
app.use('/role', roleRouter);
app.use('/employee', employeeRouter);

module.exports = app;