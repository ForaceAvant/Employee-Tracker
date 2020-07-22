const inquirer = require("inquirer");
const db = require("./db");
require("console.table");


//Start initial inquirer prompts
function start() {
    inquirer.prompt({
        type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: ["View All Employees", "Add Employees", "View All Roles", "Add Role", "Update Employee Role", "View All Departments", "Add Department"]   
    })
    .then(function(answer){
        switch (answer) {
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

};

//Adds a role to the database
function addRole() {

};

//Adds an employee to the database
function addEmployee() {

};

//Views departments in database
function viewDepartments() {
    
};

//Views roles in database
function viewRoles() {

};

//Views Employees in database
function viewEmployees() {

};

//Updates employee roles
function updateEmployeeRole(){

};