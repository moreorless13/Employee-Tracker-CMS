DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;
SELECT DATABASE();

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    department_id INT,
    manager_name VARCHAR(30),
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);


