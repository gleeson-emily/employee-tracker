DROP DATABASE IF EXISTS employee_database;

CREATE DATABASE employee_database;

USE employee_database;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
INDEX (department_id),
FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE,
PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE employees (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE CASCADE,
PRIMARY KEY (id)
) ENGINE = InnoDB;
