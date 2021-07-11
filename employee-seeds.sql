USE employee_database;


-- seeding departments

INSERT INTO department (id, dept_name)
VALUES (1, "Finance");

INSERT INTO department (id, dept_name)
VALUES (2, "Human Resources");

INSERT INTO department (id, dept_name)
VALUES (3, "Marketing");

INSERT INTO department (id, dept_name)
VALUES (4, "Sales");

-- seeding roles, three roles per department

-- Finance

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Director of Finance", 125000.00, 1);

INSERT INTO roles (id, title, salary, department_id)
VALUES (2, "Accounting Manager", 90000.00, 1);

INSERT INTO roles (id, title, salary, department_id)
VALUES (3, "Accountant", 75000.00, 1);

-- Human Resources

INSERT INTO roles (id, title, salary, department_id)
VALUES (4, "Director of Human Resources", 120000.00, 2);

INSERT INTO roles (id, title, salary, department_id)
VALUES (5, "HR Coordinator", 80000.00, 2);

INSERT INTO roles (id, title, salary, department_id)
VALUES (6, "HR Assistant", 50000.00, 2);

-- Marketing
INSERT INTO roles (id, title, salary, department_id)
VALUES (7, "Director of Marketing", 125000.00, 3);

INSERT INTO roles (id, title, salary, department_id)
VALUES (8, "Brand Specialist", 85000.00, 3);

INSERT INTO roles (id, title, salary, department_id)
VALUES (9, "Marketing Intern", 40000.00, 3);

-- Sales
INSERT INTO roles (id, title, salary, department_id)
VALUES (10, "Director of Sales", 125000.00, 4);

INSERT INTO roles (id, title, salary, department_id)
VALUES (11, "Salesperson", 75000.00, 4);

INSERT INTO roles (id, title, salary, department_id)
VALUES (12, "Sales Intern", 40000.00, 4);

-- seeding employees, four per department, at least one employee in each role

-- Finance

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Sally", "Smith", 1, NULL);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Angela", "Martin", 2, 1);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Kevin", "Malone", 3, 2);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Oscar", "Martinez", 3, 2);

-- Human Resources

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Holly", "Flax", 4, NULL);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Toby", "Flenderson", 5, 5);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Casey", "Banks", 5, 5);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (8, "Marianne", "Jones", 6, 6);

-- Marketing

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (9, "David", "Wallace", 7, NULL);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (10, "Carsen", "Lloyd", 8, 9);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (11, "Mary", "Gavigan", 8, 9);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (12, "Geoff", "Thompson", 9, 10);

-- Sales

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (13, "Karen", "Fillipelli", 10, NULL);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (14, "Roberto", "Salazar", 11, 13);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (15, "Monica", "Wong", 11, 13);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (16, "Craig", "Simon", 12, 14);