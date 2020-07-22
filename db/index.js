const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "employees"
});

connection.connect(function(err){
    if (err) throw err;
});

class db {
    constructor(connection){
        this.connection = connection;
    }

    findAllEmployees(){
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    findAllRoles(){
        return this.connection.query(
            "SELECT role.id, role.title, department.department_name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
          );
      
    }

    findAllDepartments(){
        return this.connection.query(
            "SELECT department.id, department.department_name FROM department"
          );
      
    }

    addEmployee(){

    }

    addRole(){

    }

    addDepartment(){

    }

    updateEmployeeRole(){

    }
}

module.exports = new db(connection);