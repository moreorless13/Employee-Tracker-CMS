SELECT role.id, role.title, department.name, role.salary
FROM role
Inner JOIN department ON role.department_id = department.id;
