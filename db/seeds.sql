
INSERT INTO department (department_name) 
VALUES ("Sales"), ("Engineering"), ("Legal"), ("Finance");

INSERT INTO role (title, salary, department_id) 
VALUES ("Lead Salesperson", 90000, 1), ("Salesperson", 50000, 1), ("Senior Software Engineer", 120000, 2), ("Junior Software Engineer", 85000, 2), ("Legal Team Lead", 200000, 3), ("Lawyer", 180000, 3), ("Account Manager", 175000, 4), ("Accountant", 115000, 4) ;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Patterson", 1, NULL), ("Mikayla", "Johnson", 2, 1), ("Leroy", "Jenkins", 3, NULL), ("Pew", "Diepie", 4, 3), ("John", "Cena", 5, NULL), ("Dwayne", "Johnson", 6, 5), ("Brian", "Finch", 7, NULL), ("Sierra", "Lambrough", 8, 7);
