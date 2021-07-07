DROP DATABASE IF EXISTS employee_database;

CREATE DATABASE employee_database;

USE employee_database;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
INDEX (department_id),
FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE,
PRIMARY KEY (id)
);

CREATE TABLE employees (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE CASCADE,
PRIMARY KEY (id)
); 

-- SELECT first_name FROM employees

-- TWO FILES - schema - database + another sql file that handles seeding/all other functions
-- insert values of role, department, etc. in separate file 
-- server side stuff - node inquirer, connection - put in database folder with two sql files plus two JS files (server/functions)
-- main index.js file - call everything there - async function - all logic
-- exception - using switch instead of try/catch