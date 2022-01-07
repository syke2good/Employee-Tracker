const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: '-Akash1998',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

db.connect(err => {
    if (err) throw err
    main()
});



function main() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'what would like to do?',
            name: 'choice',
            choices: [
                'view all departments?',
                'view all roles?',
                'view all employees?',
                'add a department?',
                'add a role?',
                'add an employee?',
                'update an employee role?',
            ]
        }
    ]).then(function (val) {
        switch (val.choice) {
            case 'view all departments?':
                viewAlldepartments();
                break;
            case 'view all roles?':
                viewAllroles();
                break
            case 'view all employees?':
                viewAllemployees();
                break
            case 'add a department?':
                adddepartment();
                break
            case 'add a role?':
                addrole_info();
                break
            case 'add an employee?':
                addemployee_info();
                break
            case 'update an employee role?':
                updateemployee_info();
                break
        }
    })
};

function addrole_info() {
    const sql = `SELECT name, id as value from department`;

    db.query(sql, (err, rows) => {
        if (err) throw err
        addrole(rows)
    });
}

function addemployee_info() {
    const sql = `SELECT id as value, title as name from role`;
    const sql2 = `SELECT concat(first_name, " ", last_name) as name, id as value from employee`;

    db.query(sql, (err, rows) => {
        if (err) throw err
        db.query(sql2, (err2, rows2) => {
            if (err2) throw err2
            addemployee(rows, rows2)
        });
    });

}

function updateemployee_info() {
    const sql = `SELECT id as value, title as name from role`;
    const sql2 = `SELECT concat(first_name, " ", last_name) as name, id as value from employee`;

    db.query(sql, (err, rows) => {
        if (err) throw err
        db.query(sql2, (err2, rows2) => {
            if (err2) throw err2
            updateemployee(rows, rows2)
        });
    });
}

function viewAlldepartments() {
    const sql = `SELECT * from department`;

    db.query(sql, (err, rows) => {
        if (err) throw err
        console.table(rows)
        main()
    });
}

function viewAllroles() {
    const sql = `SELECT * from role`;

    db.query(sql, (err, rows) => {
        if (err) throw err
        console.table(rows)
        main()
    });
}

function viewAllemployees() {
    const sql = `SELECT * from employee`;

    db.query(sql, (err, rows) => {
        if (err) throw err
        console.table(rows)
        main()
    });
}

function adddepartment() {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'Enter your name'
        },
    ]).then(function (val) {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        const param = [val.name]

        // const sql = `INSERT INTO department SET ?`;
        // const param = [val]

        db.query(sql, param, (err, rows) => {
            if (err) throw err
            console.table(rows)
            main()
        });

    })
}

function addemployee(roles, managers) {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Enter their first name "
        },
        {
            name: "last_name",
            type: "input",
            message: "Enter their last name "
        },
        {
            name: "role_id",
            type: "list",
            message: "What is their role? ",
            choices: roles
        },
        {
            name: "manager_id",
            type: "list",
            message: "Whats their managers name?",
            choices: managers
        }
    ]).then(function (val) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        const param = [val.first_name, val.last_name, val.role_id, val.manager_id]

        db.query(sql, param, (err, rows) => {
            if (err) throw err
            console.table(rows)
            main()
        });

    })
}

function addrole(departments) {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Enter their role "
        },
        {
            name: "salary",
            type: "input",
            message: "Enter their salary "
        },
        {
            name: "department_id",
            type: "list",
            message: "Enter their department ",
            choices: departments// [{name:"HR", value:1}]
        },




    ]).then(function (val) {
        const sql = `INSERT INTO role(title, salary, department_id) VALUES (?,?,?)`;
        const param = [val.title, val.salary, val.department_id]

        db.query(sql, param, (err, rows) => {
            if (err) throw err
            console.table(rows)
            main()
        });

    })
}

function updateemployee(roles, employees) {
    inquirer.prompt([
        {
            name: "employee",
            type: "list",
            message: "choose an employee to update ",
            choices: employees
        },
        {
            name: "role",
            type: "list",
            message: "choose an employee role to update ",
            choices: roles
        },
    ]).then (function (val) {
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?;`;
        const param = [val.role, val.employee]

        db.query(sql, param, (err, rows) => {
            if (err) throw err
            console.table(rows)
            main()
        }); 
    })
}

