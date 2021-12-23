INSERT INTO department (name)
VALUES 
('Programming'),
('Finance & Accounting'),
('Sales & Marketing'),
('Operations');

INSERT INTO role (title, salary, department_id)
VALUES
('Full Stack Developer', 80000, 1),
('Software Engineer', 120000, 1),
('Accountant', 10000, 2), 
('Finanical Analyst', 150000, 2),
('Marketing Coordindator', 70000, 3), 
('Sales Lead', 90000, 3),
('Project Manager', 100000, 4),
('Operations Manager', 90000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Natsu', 'Dragneel', 2, null),
('Kurosaki', 'Ichigo', 1, 1),
('Uzumaki', 'Naruto', 4, null),
('Heartfilia', 'Lucy', 3, 3),
('Ishigami', 'Senku', 6, null),
('Roronoa', 'Zoro', 5, 5),
('Hancock', 'Boa', 7, null),
('Scarlet', 'Erza', 8, 7);