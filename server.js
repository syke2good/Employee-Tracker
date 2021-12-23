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
                addrole();
                break
            case 'add an employee?':
                addemployee();
                break
            case 'update an employee role?':
                updateemployee();
                break
        }
    })
};

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

function addemployee() {
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter their first name "
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter their last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is their role? ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ])



    const sql = `SELECT * from employee`;

    db.query(sql, (err, rows) => {
        if (err) throw err
        console.table(rows)
        main()
    });
}

function addrole() {
    const sql = `SELECT * from role`;

    db.query(sql, (err, rows) => {
        if (err) throw err
        console.table(rows)
        main()
    });
}

function updateemployee() {
    const sql = `SELECT * from employee`;

    db.query(sql, (err, rows) => {
        if (err) throw err
        console.table(rows)
        main()
    });
}

