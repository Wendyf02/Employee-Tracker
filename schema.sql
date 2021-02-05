DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

--Department Table---
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)

);

---Department Table---
CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

---Employee Role Table----
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    manager_id INT,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)

);

---Department Seeds---
INSERT INTO department (id, name)
VALUE (1, "Design");

INSERT INTO department (id, name)
VALUE (2, "Technical Design");

INSERT INTO department (id,name)
VALUE (3, "Production");

INSERT INTO department (id,name)
VALUE (4, "Sales");

INSERT INTO department (id,name)
VALUE (5, "Finance");


---Role Seeds---

INSERT INTO role (id, title, salary, department_id)
VALUE(1, "Design Director", 90000, 02)

INSERT INTO role (id, title, salary, department_id)
VALUE(2, "Designer Mens wear", 80000, 02)

INSERT INTO role (id, title, salary, department_id)
VALUE(3, "Technical Designer", 45000, 04)

INSERT INTO role (id, title, salary, department_id)
VALUE(4, "Product Development", 47500, 06)

INSERT INTO role (id, title, salary, department_id)
VALUE(5, "Salesperson", 54000, 08)

INSERT INTO role (id, title, salary, department_id)
VALUE(6, "Accountant", 70000, 10)


----Employee Seeds----

INSERt INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Luna Amina", "Jebreal" null, 1);

INSERt INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Noor", "Abdullah" 1, 2);

INSERt INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Karim", "Hadid" 1, 3);

INSERt INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jameel", "Fernandez" 1, 4);

INSERt INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Abadi", "Ebeid" 1, 5);

INSERt INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Amin", "Fernandez" 1, 6);


--Select For Creating Tables in our SQL Workbench 

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;

