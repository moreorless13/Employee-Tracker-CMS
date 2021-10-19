SELECT role.id, role.title, department.name, role.salary
FROM role
Inner JOIN department ON role.department_id = department.id;

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_name
FROM ((employee
INNER JOIN role ON employee.role_id = role.id)
INNER JOIN department ON employee.department_id = department.id); 