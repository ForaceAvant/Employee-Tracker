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

    }

    findAllRoles(){

    }

    findAllDepartments(){

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