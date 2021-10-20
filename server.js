const inquirer = require('inquirer');
// const mysql = require('mysql2');
const Database = require('./database');
const dotenv = require('dotenv');
dotenv.config();

// configuring server
const db = new Database(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'company_db'
    },
    console.log(`Connected to the database.`)
);

async function viewDepartments() {
  console.log("");
  let query = "SELECT id, name FROM department";
  const rows = await db.query(query);
  console.table(rows);
}

async function viewRoles() {
  console.log("");
  let sql = 'SELECT role.id, role.title, department.name, role.salary FROM role INNER JOIN department ON role.department_id = department.id';
  const rows = await db.query(sql);
  console.table(rows);
}

async function viewEmployees() {
  console.log("");
  let sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_name FROM ((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department ON employee.department_id = department.id);';
  const rows = await db.query(sql);
  console.table(rows);
}


async function viewEmployeesByDepartment() {
  console.log("");
  let sql = "SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);";
  const rows = await db.query(sql);
  console.table(rows);
}

async function addDepartment(departmentInfo) {
  const departmentName = departmentInfo.departmentName
  let sql = 'INSERT INTO department (name) VALUES (?)';
  let args = [departmentName];
  const rows = await db.query(sql, args);
  console.log(`${departmentName} added!`);
}

async function getDepartmentNames() {
  let sql = 'SELECT name FROM department';
  const rows = await db.query(sql);

  let departments = [];
  for(const row of rows) {
    departments.push(row.name);
  }

  return departments;
}

async function getDepartmentId(departmentName) {
    let sql = "SELECT * FROM department WHERE department.name=?";
    let args = [departmentName];

    const rows = await db.query(sql, args);
    return rows[0].id;
}

async function addRole(roleInfo){
  const departmentId = await getDepartmentId(roleInfo.departmentName);
  const salary = roleInfo.salary;
  const title = roleInfo.roleTitle;
  let sql = 'INSERT INTO role (title, salary, department_id VALUES (?, ?, ?)';
  let args = [title, salary, departmentId];
  const rows = await db.query(sql, args);
  console.log(`${roleName} added!`)
}

async function getRoles(){
  let sql = "SELECT title FROM role";
  const rows = await db.query(sql);
  let roles = [];
  for(const row of rows) {
    roles.push(row.title);
  }

  return roles;
}

async function getRoleId(roleName) {
  let sql = "SELECT * FROM role WHERE role.title=?";
  let args = [roleName];
  const rows = await db.query(sql, args);
  return rows[0].id;
}



// app.get('/api/department', (req, res) => {
  
  
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//        return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// app.post('/api/department', ({ body }, res) => {
  
//   let params = [body.name];

//   db.query(sql, params, (err, result) => {
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

// app.delete('/api/department/:id', (req, res) => {
//   let sql = `DELETE FROM department WHERE id = ?`;
//   let params = [req.params.id];
  
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//       res.json({
//       message: 'Department not found'
//       });
//     } else {
//       res.json({
//         message: 'deleted',
//         changes: result.affectedRows,
//         id: req.params.id
//       });
//     }
//   });
// });

// app.get('/api/role', (req, res) => {
//   let sql = `SELECT role.id, role.title, department.name, role.salary FROM role INNER JOIN department ON role.department_id = department.id`;
  
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//        return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// app.post('/api/role', (req, res) => {

//   console.log(req.body)
//   let sql = `INSERT INTO role (title, salary, department_id) 
//     VALUES (?, ?, ?)`;

//   const { title, salary, department_id } = req.body;

//   let params = [title, salary, department_id];
//   let response;

//   db.query(sql, params, (err, result) => {
//     console.log(params);
//     if (err) {
//       console.error(err);
//       res.status(500).json('Error in posting new role');
//       return;
//     } else {
//       res.status(201).json({
//           message: 'success',
//           data: req.body
//       });
//     };
//   })
  
// });

// app.delete('/api/role/:id', (req, res) => {
//   let sql = `DELETE FROM role WHERE id = ?`;
//   let params = [req.params.id];
  
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//       res.json({
//       message: 'Role not found'
//       });
//     } else {
//       res.json({
//         message: 'deleted',
//         changes: result.affectedRows,
//         id: req.params.id
//       });
//     }
//   });
// });

// app.get('/api/employee', (req, res) => {
//   let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_name
// FROM ((employee
// INNER JOIN role ON employee.role_id = role.id)
// INNER JOIN department ON employee.department_id = department.id);`;
  
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//        return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// app.post('/api/employee', (req, res) => {

//   console.log(req.body)
//   let sql = `INSERT INTO employee (first_name, last_name, role_id, manager_name) 
//     VALUES (?, ?, ?, ?)`;

//   const { first_name, last_name, role_id, manager_name } = req.body;

//   let params = [first_name, last_name, role_id, manager_name];
//   let response;

//   db.query(sql, params, (err, result) => {
//     console.log(params);
//     if (err) {
//       console.error(err);
//       res.status(500).json('Error in posting new role');
//       return;
//     } else {
//       res.status(201).json({
//           message: 'success',
//           data: req.body
//       });
//     };
//   })
  
// });

// app.delete('/api/employee/:id', (req, res) => {
//   let sql = `DELETE FROM employee WHERE id = ?`;
//   let params = [req.params.id];
  
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//       res.json({
//       message: 'Employee not found'
//       });
//     } else {
//       res.json({
//         message: 'deleted',
//         changes: result.affectedRows,
//         id: req.params.id
//       });
//     }
//   });
// });

async function promptUser() {
    return inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "action",
                choices: [
                  "Add Department",
                  "Add Employee",
                  "Add Role",
                  "Remove Employee",
                  "Update Employee Role",
                  "View Departments",
                  "View Employees",
                  "View Employees by department",
                  "View Roles",
                  "Exit"
                ]
            }
        ])
}

async function getAddEmployeeInfo(){
  return inquirer
    .prompt([
      {
        type: 'input',
        message: "New Employee's First Name:",
        name: 'first_name'
      },
      {
        type: 'input',
        message: "New Employee's Last Name:",
        name: 'last_name'
      },
      {
        type: 'list',
        message: "What is the new employee's role?",
        name: "role",
        choices: [
          ...roles
        ]
      },
      {
        type: 'list',
        message: "Who is the new employee's manager?",
        name: "manager", 
        choices: [
          ...managers
        ]
      }
    ])
}

async function getRemoveEmployeeInfo() {
  return inquirer
    .prompt([
      {
        type: 'list',
        message: "Which employee would you like to remove?",
        name: "employeeName",
        choices: [
          ...employees
        ]
      }
    ])
}

async function getDepartmentInfo() {
  return inquirer
    .prompt([
      {
        type: 'input',
        message: "What is your new department name?",
        name: 'departmentName'
      }
    ])
}

async function getRoleInfo() {
  const departments = await getDepartmentNames();
  return inquirer
    .prompt([
      {
        type: 'input',
        message: "What is the title of the new role?",
        name: 'roleTitle'
      },
      {
        type: 'input',
        message: 'What is the salary of the new role?',
        name: 'salary'
      },
      {
        type: 'list',
        message: 'Which department uses this role?',
        name: 'departmentName',
        choices: [
          ...departments
        ]
      }
    ])
}


async function promptHandler() {
  let exitLoop = false;
  while(!exitLoop) {
    const prompt = await promptUser();

    switch(prompt.action) {
      case 'Add Department': {
        const newDepartmentName = await getDepartmentInfo();
        await addDepartment(newDepartmentName);
        break;
      }
      case 'Add Employee': {
        const newEmployee = await getEmployeeInfo();
        console.log("Add a new employee")
        console.log(newEmployee);
        await addEmployee(newEmployee);
        break;
      }
      case 'Add Role': {
        const newRole = await getRoleInfo();
        console.log.og("Add a new role");
        await addRole(newRole);
        break;
      }
      case 'Remove Employee': {
        const employee = await getRemoveEmployeeInfo();
        await removeEmployee(employee);
        break;
      }
      case 'Update Employee Role': {
        const employee = await updateEmployeeRoleInfo();
        await updateEmployeeRole(employee);
        break;
      }
      case 'View Departments': {
        await viewDepartments();
        break;
      }
      case 'View Employees': {
        await viewEmployees();
        break;
      }
      case 'View Employees by department': {
        await viewEmployeesByDepartment();
        break;
      }
      case 'View Roles': {
        await viewRoles();
        break;
      }
      case 'Exit': {
        exitLoop = true;
        process.exit(0);
        return;
      }
      default:
        console.log(`Warning ${prompt.action} not permitted!`)
    }

  }
}

process.on('Exit', async function(code) {
  await db.close();
  return console.log(`Exiting ${code}`);
});

promptHandler();