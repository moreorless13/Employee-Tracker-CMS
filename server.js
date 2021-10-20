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
  let sql = "SELECT id, name FROM department";
  let rows = await db.query(sql);
  console.table(rows);
}

async function viewRoles() {
  console.log("");
  let sql = 'SELECT role.id, role.title, department.name, role.salary FROM role INNER JOIN department ON role.department_id = department.id';
  let rows = await db.query(sql);
  console.table(rows);
}

async function viewEmployees() {
  console.log("");
  let sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_name FROM ((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department ON employee.department_id = department.id);';
  let rows = await db.query(sql);
  console.table(rows);
}


async function viewEmployeesByDepartment() {
  console.log("");
  let sql = "SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON employee.department_id = department.id);";
  let rows = await db.query(sql);
  console.table(rows);
}

async function addDepartment(departmentInfo) {
  let departmentName = departmentInfo.departmentName
  let sql = 'INSERT into department (name) VALUES (?)';
  let args = [departmentName];
  const rows = await db.query(sql, args);
  console.log(`${departmentName} added!`);
}

async function getDepartmentNames() {
  let sql = 'SELECT name FROM department';
  let rows = await db.query(sql);

  let departments = [];
  for(const row of rows) {
    departments.push(row.name);
  }

  return departments;
}

async function getDepartmentId(departmentName) {
  let sql = "SELECT * FROM department WHERE department.name=?";
  let args = [departmentName];
  console.log(departmentName);
  let rows = await db.query(sql, args);
  console.log(rows)
  console.log(rows[0].id);
  return rows[0].id;
}

async function addRole(roleInfo){
  let departmentId = await getDepartmentId(roleInfo.departmentName);
  let salary = roleInfo.salary;
  let roleName = roleInfo.roleName;
  let sql = "INSERT into role (title, salary, department_id) VALUES (?, ?, ?)";
  let args = [roleName, salary, departmentId];
  const rows = await db.query(sql, args);
  console.log(rows);
  console.log(`${roleName} added!`)
}

async function getRoles(){
  let sql = "SELECT title FROM role";
  let rows = await db.query(sql);
  let roles = [];
  for(const row of rows) {
    roles.push(row.title);
  }

  return roles;
}

async function getRoleId(roleName) {
  let sql = "SELECT * FROM role WHERE role.title=?";
  let args = [roleName];
  let rows = await db.query(sql, args);
  console.log(rows[0])
  return [rows[0].id, rows[0].department_id];
}

async function getEmployeeId(fullName) {
  let employee = await getFullName(fullName);
  let sql = "SELECT id FROM employee WHERE employee.first_name=? AND employee.last_name=?";
  let args = [employee[0], employee[1]];
  let rows = await db.query(sql, args);
  return rows[0].id;
}

async function getEmployeeNames(){
  let sql = 'SELECT * FROM employee';
  let rows = await db.query(sql);
  let employeeNames = [];
  for(const employee of rows){
    employeeNames.push(employee.first_name + " " + employee.last_name)
  };
  return employeeNames;
}

async function getFullName(fullName) {
  let employee = fullName.split(' ');
  if (employee.length == 2) {
    return employee;
  } else {
    let last_name = employee[employee.length-1];
    let first_name = " ";
    for(let i=0; i<employee.length-1; i++) {
      first_name = first_name + employee[i] + " ";
    }
    return [first_name.trim(), last_name];
  }
}

async function getManagers() {
  let sql = 'SELECT * FROM employee WHERE manager_name IS NULL';

  let rows = await db.query(sql);
  let managers = [];
  for(const employee of rows) {
    managers.push(employee.first_name + " " + employee.last_name);
  }

  return managers;
}

async function addEmployee(employeeInfo) {
  let roleId = await getRoleId(employeeInfo.role);
  let manager_name = employeeInfo.manager;
  console.log(roleId);
  let role_id = roleId[0]
  let department_id = roleId[1]
  let sql = "INSERT INTO employee (first_name, last_name, role_id, department_id, manager_name) VALUES (?, ?, ?, ?, ?)";
  let args = [employeeInfo.first_name, employeeInfo.last_name, role_id, department_id, manager_name];
  const rows = await db.query(sql, args);
  console.log(`${employeeInfo.first_name} ${employeeInfo.last_name} added!`)
}

async function removeEmployee(employeeInfo) {
  let employee = employeeInfo.employeeName;
  console.log(employee);
  let employeeId = await getEmployeeId(employee);
  console.log(employeeId)
  let sql = 'DELETE FROM employee WHERE id=?';
  let args = [employeeId];
  let rows = await db.query(sql, args);
  console.log(`${employee} with employee id: ${employeeId} was removed.`);
}

async function updateEmployeeRole() {

}

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

async function getEmployeeInfo(){
  let roles = await getRoles();
  let managers = await getManagers();
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
  let employees = await getEmployeeNames();
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
        name: 'roleName'
      },
      {
        type: 'input',
        message: 'What is the salary of the new role?',
        name: 'salary',
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
        console.log("Add a new role");
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