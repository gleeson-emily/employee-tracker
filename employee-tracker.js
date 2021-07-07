const inquirer = require('inquirer');
const mySql = require('mysql');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_database',
  });

  function startTracker() {
      inquirer
        .prompt (
        {
        name: "start",
        type: "list",
        message: "What would you like to do?",
        choices: 
            ["View all employees",
             "View employees by department",
             "View employees by role",
             "View employees by manager",
             "View department budget",
             "Add an employee",
             "Add a role",
             "Add a department",
             "Update an employee",
             "Update a manager",
             "Delete an employee",
             "Delete a role",
             "Delete a department"],
      })
      .then(function (choice) {
          switch(choice.action) {
            case "View all employees": 
                viewEmployees();
                break;

            case "View employees by department":
                viewEmpByDept();
                break;

            case "View employees by role":
                viewEmpbyRole();
                break;

            case "View employees by manager":
                viewEmpByMgr();
                break;

            case "View department budget":
                viewBudget();
                break;

            case "Add an employee":
                addEmployee();
                break;
            
            case "Add a role":
                addRole();
                break;

            case "Add a department":
                addDept();
                break;

            case "Update an employee":
                updateEmployee();
                break;
            
            case "Update a manager":
                updateManager();
                break;

            case "Delete an employee":
                deleteEmployee();
                break;

            case "Delete a role":
                deleteRole();
                break;

            case "Delete a department":
                deleteDept();
          }
     
  }
})




  function viewEmployees () {

  }

  function viewEmpByDept () {

  }

  function viewEmpbyRole () {

  }

  function viewEmpByMgr () {

  }

  function viewBudget () {

  }

  function addEmployee () {

  }

  function addRole () {

  }

  function addDept () {

  }

  function updateEmployee () {

  }

  function updateManager () {

  }

  function deleteEmployee () {

  }

  function deleteRole () {

  }

  function deleteDept () {

  }