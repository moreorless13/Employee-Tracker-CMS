
INSERT INTO department (name)
VALUES ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');

INSERT INTO role (name, salary, department)
VALUES ('Sales Lead', 100000, 1),
        ('Salesperson', 80000, 1),
        ('Lead Engineer', 150000, 2),
        ('Software Engineer', 120000, 2),
        ('Account Manager', 160000, 3),
        ('Accountant', 125000, 3),
        ('Legal Team Lead', 250000, 4),
        ('Lawyer', 190000, 4);

-- INSERT INTO employee (employee_id, first_name, last_name, role, department, salary, manager_name)
-- VALUES (1, 'John', 'Doe', 1, 1, 100000, NULL), 
--         (2, 'Mike', 'Chan', 2, 1, 80000, 'John Doe'),
--         (3, 'Ashley', 'Rodriguez', 3, 2, 150000, NULL),
--         (4, 'Kevin', 'Tupik', 4, 2, 120000, 'Ashley Rodriguez'),
--         (5, 'Kunal', 'Singh', 5, 3, 160000, NULL),
--         (6, 'Malia', 'Brown', 6, 3, 125000, 'Kunal Singh'),
--         (7, 'Sarah', 'Lourd', 7, 4, 250000, NULL),
--         (8, 'Tom', 'Allen', 8, 4, 190000, 'Sarah Lourd');       
