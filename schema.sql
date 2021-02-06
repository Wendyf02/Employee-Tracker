DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;


CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)

);


CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);


CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    manager_id INT,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)

);


INSERT INTO department (name)
VALUE ("Design");

INSERT INTO department (name)
VALUE ("Technical Design");

INSERT INTO department (name)
VALUE ("Production");

INSERT INTO department (name)
VALUE ("Sales");

INSERT INTO department (name)
VALUE ("Finance");




INSERT INTO role (title, salary, department_id)
VALUE( "Design Director", 90000, 1);

INSERT INTO role (title, salary, department_id)
VALUE("Designer Mens wear", 80000, 1);

INSERT INTO role (title, salary, department_id)
VALUE("Technical Designer", 45000, 2);

INSERT INTO role (title, salary, department_id)
VALUE("Product Development", 47500, 3);

INSERT INTO role (title, salary, department_id)
VALUE( "Salesperson", 54000, 4);

INSERT INTO role (title, salary, department_id)
VALUE("Accountant", 70000, 5);




INSERt INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Luna Amina", "Jebreal", null, 1);

INSERt INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Noor", "Abdullah", 1, 2);

INSERt INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Karim", "Hadid", 1, 3);

INSERt INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jameel", "Fernandez", 1, 4);

INSERt INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Abadi", "Ebeid", 1, 5);

INSERt INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Amin", "Fernandez", 1, 6);



SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;
