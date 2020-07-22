const inquirer = require("inquirer");
require("console.table");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employees"
});

start();
//Start initial inquirer prompts
function start() {
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: ["View All Employees", "Add Employees", "View All Roles", "Add Role", "Update Employee Role", "View All Departments", "Add Department"]
    })
        .then(function (answer) {
            switch (answer.choice) {
                case "View All Employees":
                    return viewEmployees();
                case "Add Employees":
                    return addEmployee();
                case "View All Roles":
                    return viewRoles();
                case "Add Role":
                    return addRole();
                case "Update Employee Role":
                    return updateEmployeeRole();
                case "View All Departments":
                    return viewDepartments();
                case "Add Department":
                    return addDepartment();
                default:
                    return quit();
            };
        });
};

//Adds a department to the database
function addDepartment() {
    inquirer.prompt([
        {
            name: "departmentName",
            type: "input",
            message: "What is the name of the Department?"
        }
    ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    department_name: answer.departmentName
                },
                function (err) {
                    if (err) throw err;
                    console.log(`Added ${answer.departmentName} to the database`);
                    start();
                }
            )
        })

};

//Adds a role to the database
function addRole() {

    connection.query(
        "SELECT * FROM department",
        function (err, results) {
            if (err) throw err;

            const departments = [];
            results.forEach(result => departments.push(result.department_name))

            inquirer.prompt([
                {
                    name: "title",
                    type: "input",
                    message: "What is the name of the Role?"
                },
                {
                    name: "salary",
                    type: "input",
                    message: "What is the salary for this role"
                },
                {
                    name: "department_id",
                    type: "list",
                    message: "Which department does this role belong to?",
                    choices: departments
                }
            ])
                .then(function (answer) {

                    var departmentId = -1;

                    for (let i = 0; i < results.length; i++) {
                        if (results[i].department_name === answer.department_id) {
                            departmentId = results[i].id;
                        }
                    }

                    connection.query(
                        "INSERT INTO role SET ?",
                        {
                            title: answer.title,
                            salary: answer.salary,
                            department_id: departmentId
                        },
                        function (err) {
                            if (err) throw err;
                            console.log(`Added ${answer.title} to the database`);
                            start();
                        }
                    )
                })
        }
    )


};

//Adds an employee to the database
function addEmployee() {
    connection.query(
        "SELECT * FROM role",
        function (err, results) {
            if (err) throw err;

            var roles = [];
            var titles = [];

            roles = results;
            roles.forEach(role => titles.push(role.title));

            connection.query(
                "SELECT * FROM employee",
                function (err, results) {
                    if (err) throw err;
                    var managers = [];
  
                    var managerNames = ["None"];

                    managers = results;
                    managers.forEach(manager => managerNames.push(manager.first_name + " " + manager.last_name));
                    

                    inquirer.prompt([
                        {
                            name: "firstName",
                            type: "input",
                            message: "What is the employees first name?",
                        },
                        {
                            name: "lastName",
                            type: "input",
                            message: "What is the employees last name?"
                        },
                        {
                            name: "role_id",
                            type: "list",
                            message: "What role will this employee have?",
                            choices: titles
                        },
                        {
                            name: "manager_id",
                            type: "list",
                            message: "Who is the manager of this employee?",
                            choices: managerNames
                        }
                    ])
                        .then(function (answer) {
                            var roleId;
                            var managerId = null;

                            var managersName = (answer.manager_id).split(" ");
                            

                            for (let i = 0; i < managers.length; i++) {
                                if (managersName[0] == managers[i].first_name) {
                                    managerId = managers[i].id;
                                    
                                }
                            }

                            for (let i = 0; i < roles.length; i++) {
                                if (answer.role_id == roles[i].title) {
                                    roleId = roles[i].id;
                                }
                            }

                            connection.query(
                                "INSERT INTO employee SET ?", {
                                first_name: answer.firstName,
                                last_name: answer.lastName,
                                role_id: roleId,
                                manager_id: managerId
                            },
                            function (err) {
                                if (err) throw err;
                                console.log(`Added ${answer.firstName} ${answer.lastName} to the database`);
                                start();
                            }

                            )
                        })
                }
            )
        }
    )
};

//Views departments in database
function viewDepartments() {
    connection.query(
        "SELECT * FROM department",
        function (err, results) {
            if (err) throw err;

            console.log("\n");
            console.table(results);

            start();
        }
    );
};

//Views roles in database
function viewRoles() {
    connection.query(
        "SELECT * FROM role",
        function (err, results) {
            if (err) throw err;

            console.log("\n");
            console.table(results);

            start();
        }
    );
};

//Views Employees in database
function viewEmployees() {
    connection.query(
        "SELECT * FROM employee",
        function (err, results) {
            if (err) throw err;

            console.log("\n");
            console.table(results);

            start();
        }
    );
};

//Updates employee roles
function updateEmployeeRole() {

};

function quit() {
    console.log("Have a nice day!");
    process.exit();
}