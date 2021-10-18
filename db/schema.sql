DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;
SELECT DATABASE();

DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS roles;
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department INT,
    FOREIGN KEY (department)
    REFERENCES department(id)
    ON DELETE SET NULL
);

DROP TABLE IF EXISTS employee;
-- CREATE TABLE employee (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     first_name VARCHAR(30),
--     last_name VARCHAR(30),
--     role INT,
--     FOREIGN KEY (role)
--     REFERENCES role(id)
--     ON DELETE SET NULL,
--     department INT,
--     FOREIGN KEY (department)
--     REFERENCES department(id)
--     ON DELETE SET NULL,
--     salary DECIMAL,
--     manager_name VARCHAR(50)
-- );

