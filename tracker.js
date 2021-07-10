const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connectionInfo = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_database',
  }

const connection = mysql.createConnection(connectionInfo);

connection.connect((err) => {
    if (err) throw (err);
    console.log("Welcome to Employee Tracker!");
    startTracker();
})

async function startTracker() {
    const { choice } = await inquirer.prompt 
    ({
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: 
            [
            {
                name: "View all employees",
                value: "VIEW_EMPLOYEES"
            },
            {
                name: "View departments",
                value: "VIEW_DEPTS"
            },
            {
                name: "View roles",
                value: "VIEW_ROLES"
            },
            {
                name: "View employees by department",
                value: "VIEW_EMP_BY_DEPT"
             },
             {
                name: "View employees by role",
                value: "VIEW_EMP_BY_ROLE"
             },
            {
               name: "View employees by manager",
               value: "VIEW_EMP_BY_MGR"
            },
             {
               name: "View department budget", 
               value: "VIEW_BUDGET"
             },
             {
               name: "Add an employee", 
               value: "ADD_EMPLOYEE"
             },
             {
                name: "Add a role",
                value: "ADD_ROLE"
             },
             {
               name: "Add a department",
               value: "ADD_DEPT"
             },
             {
               name:  "Update an employee",
               value: "UPDATE_EMP"
             },
             {
                name: "Update a manager",
                value: "UPDATE_MGR"
             },
             {
                name: "Delete an employee",
                value: "DELETE_EMP"

             },
            {
                name: "Delete a role",
                value: "DELETE_ROLE"
                
            },
            {
                name: "Delete a department", 
                value: "DELETE_DEPT"
            },
            {
               name: "Exit",
               value: "EXIT_APP"
            }
             ],
      })
          switch(choice) {
            case "VIEW_EMPLOYEES": 
                return viewEmployees(); 

            case "VIEW_DEPTS":
                return viewDepts();

            case "VIEW_ROLES":
                return viewRoles();

            case "VIEW_EMP_BY_DEPT":
                viewEmpByDept();
                break;

            case "VIEW_EMP_BY_ROLE":
                viewEmpByRole();
                break;

            case "VIEW_EMP_BY_MGR":
                viewEmpByMgr();
                break;

            case "VIEW_BUDGET":
                viewBudget();
                break;

            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            
            case "ADD_ROLE":
                addRole();
                break;

            case "ADD_DEPT":
                addDept();
                break;

            case "UPDATE_EMP":
                updateEmployee();
                break;
            
            case "UPDATE_MGR":
                updateManager();
                break;

            case "DELETE_EMP":
                deleteEmployee();
                break;

            case "DELETE_ROLE":
                deleteRole();
                break;

            case "DELETE_DEPT":
                deleteDept();
                break;

            default:
                return;
          };


}

function viewEmployees() {
    let sqlQuery = "SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary FROM employee_database.employees LEFT JOIN roles on roles.id = employees.role_id"
    connection.query(sqlQuery, function(err, response) {
        if (err) throw err;
        console.table(response);
        startTracker();  
        });
}

 function viewDepts () {
    let sqlQuery = "SELECT department.id, dept_name AS department FROM department";

    connection.query(sqlQuery, function(err, response) {
        if (err) throw err;
        console.table(response);
        startTracker();
    });
}

  function viewRoles () {
      let sqlQuery = "SELECT roles.id, roles.title, department.dept_name AS department, roles.salary FROM roles LEFT JOIN department on roles.department_id = department.id"
      connection.query(sqlQuery, function(err, results) {
          if (err) throw err;
          console.table(results);

    startTracker();
      });

  }

  function viewEmpByDept() {

  }

  function viewEmpByRole() {
      
}

 
  function viewEmpByMgr () {
        
  }

  function viewBudget () {

  }

  function addEmployee () {
        inquirer.prompt([
            {
            name: "firstName",
            type: "input",
            message: "What is the new employee's first name?",
            validate: (newEmpFirstName) => {
                if (newEmpFirstName) {
                    return true;
                } else {
                    console.log("Please enter a valid first name.")
                }
            }
        },
        {
                name: "lastName",
                type: "input",
                message: "What is the new employee's last name?",
                validate: (newEmpLastName) => {
                    if (newEmpLastName) {
                        return true;
                    } else {
                        console.log("Please enter a valid last name.")
                    }
                }
        },
    ])
            .then(answer => {
            let newEmp = [answer.firstName, answer.lastName]
            let findRole = "SELECT roles.id, roles.title FROM roles";
            connection.query(findRole, (err, response) => {
                if (err) throw err;
            let roles = response.map(({id, title}) => ({ name: title, value: id }));
                inquirer.prompt([
                    {
                        name: "newEmpRole",
                        type: "list",
                        message: "What is the employee's role?",
                        choices: roles
                    }
                ])   
        .then(roleAnswer => {
            let empRoles = roleAnswer.newEmpRole;
            newEmp.push(empRoles);
            let managersSql = "SELECT * FROM employees"
            connection.query(managersSql, (err, response) => {
                if (err) throw err;
            let managers = response.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}));
                inquirer.prompt ([
                    {
                        name: "newManager",
                        type: "list",
                        message: "Who is the employee's manager?",
                        choices: managers
                    }
                ])
                .then(managerAnswer => {
                   let newManager = managerAnswer.newManager;
                   newEmp.push(newManager);
                   console.log(newEmp)
                   let newEmpSql = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                   connection.query(newEmpSql, newEmp, (err) => {
                       if (err) throw err;
                       console.log("New employee added!")
                       viewEmployees();
                   });
                }); 
              });
            });
        });
    });
};

//   function addRole () {

//   }

//   function addDept () {

//   }

//   function updateEmployee () {

//   }

//   function updateManager () {

//   }

//   function deleteEmployee () {

//   }

//   function deleteRole () {

//   }

//   function deleteDept () {

//   }


 