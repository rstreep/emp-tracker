USE emp_db;

INSERT INTO department (name)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');


INSERT INTO role (title, department_id, salary)
VALUES 
    ('Sales Lead', 1, 100000),
    ('Salesperson', 1, 80000),
    ('Lead Engineer', 2, 150000),
    ('Software Engineer', 2, 120000),
    ('Account Manager', 3, 160000),
    ('Accountant', 3, 125000),
    ('Legal Team lead', 4, 250000),
    ('Lawyer', 4, 190000);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Nellie', 'Stinky', 1, NULL),
    ('Scarlet', 'Bagonias', 2, 1),
    ('Chris', 'Topher', 3, NULL),
    ('Rich', 'Iana', 4, 3),
    ('Dev', 'Iana', 5, NULL),
    ('Luna', 'Tuna', 6, 5),
    ('Kayla', 'Smells', 7, NULL),
    ('Janine', 'Eatshorts', 8, 7);
