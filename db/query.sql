SELECT 
FROM role
LEFT JOIN department
ON department.id = role.department;
