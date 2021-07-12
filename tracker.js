const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connectionInfo = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_database',
  }

const connection = mysql2.createConnection(connectionInfo);

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
               name:  "Update an employee's role",
               value: "UPDATE_EMP"
             },
             {
                name: "Update an employee's manager",
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
    let sqlQuery = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary 
                    FROM employee_database.employees LEFT JOIN roles on roles.id = employees.role_id`
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
      let deptQuery = "SELECT id, dept_name FROM department";
      connection.query(deptQuery, function(err, results) {
          if (err) throw err;
          let depts = results.map(({id, dept_name}) => ({name: dept_name, value: id}));
          inquirer.prompt([
              {
                  name: "chooseDept",
                  type: "list",
                  message: "View employees from which department?",
                  choices: depts
              }
          ])
          .then(answerDept => {
            let selectDeptSql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary 
                                FROM employee_database.employees LEFT JOIN roles on roles.id = employees.role_id 
                                INNER JOIN department on roles.department_id = department.id WHERE department.id = ${answerDept.chooseDept}`;
                connection.query(selectDeptSql, (err, response) => {
                    if (err) throw err;
                    console.table(response)
                    startTracker();
                       });
                    }); 
          })
      }    

  function viewEmpByRole() {
    let rolesQuery = "SELECT id, title FROM roles";
    connection.query(rolesQuery, function(err, results) {
        if (err) throw err;
        let roles = results.map(({id, title}) => ({name: title, value: id}));
        inquirer.prompt([
            {
                name: "chooseRoles",
                type: "list",
                message: "View employees with which role?",
                choices: roles
            }
        ])
        .then(answerRole => {
          let selectRoleSql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, 
                                roles.salary, FROM employee_database.employees LEFT JOIN roles on roles.id = employees.role_id 
                                WHERE roles.id = ${answerRole.chooseRoles}`;
              connection.query(selectRoleSql, (err, response) => {
                  if (err) throw err;
                  console.table(response)
                  startTracker();
                     });
                  }); 
        })
}

 
  function viewEmpByMgr () {
    let managerQuery = "SELECT id, first_name, last_name FROM employees";
    connection.query(managerQuery, function(err, results) {
        if (err) throw err;
        let managers = results.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}));
        inquirer.prompt([
            {
                name: "chooseManager",
                type: "list",
                message: "View employees with which manager?",
                choices: managers
            }
        ])
        .then(answerManagers => {
          let selectMgrSql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary FROM employee_database.employees 
                            LEFT JOIN roles on roles.id = employees.role_id 
                            WHERE employees.manager_id = ${answerManagers.chooseManager}`;
              connection.query(selectMgrSql, (err, response) => {
                  if (err) throw err;
                  console.table(response)
                  startTracker();
                     });
                  }); 
        })
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

function addRole () {
    inquirer.prompt([
        {
            name: "addNewRole",
            type: "input",
            message: "What is the name of the new role?",
            validate: (newRoleName) => {
                if (newRoleName) {
                    return true;
                } else {
                    console.log("Please enter a name for this role.")
                }
        }
    },
    {
            name: "newRoleSalary",
            type: "number",
            message: "What is the new role's salary?",
            validate: (newSalary) => {
                if (newSalary) {
                    return true;
                } else {
                    console.log("Please enter a valid number!")
                }
            }
    },
])
.then(newRoleAnswer => {
    let newRole = [newRoleAnswer.addNewRole, newRoleAnswer.newRoleSalary];
    let findDept = "SELECT department.id, department.dept_name FROM department";
    connection.query(findDept, (err, response) => {
        if (err) throw err
        let dept = response.map(({id, dept_name}) => ({ name: dept_name, value: id }));
        inquirer.prompt ([ {
            name: "newRoleDept",
            type: "list",
            message: "What department does this role fall under?",
            choices: dept
        }
        ])
            .then(deptAnswer => {
                let newDept = deptAnswer.newRoleDept;
                newRole.push(newDept);
                let newRoleSql = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
                connection.query(newRoleSql, newRole, (err) => {
                    if (err) throw err;
                    console.log("New role added!")
                    viewRoles();
               });
            }); 
          });
        });
}

function addDept () {
    inquirer.prompt([
        {
            name: "addNewDept",
            type: "input",
            message: "What is the name of the new department?",
            validate: (newDeptName) => {
                if (newDeptName) {
                    return true;
                } else {
                    console.log("Please enter a name for this department.")
                }
        }
    }
])
.then(newDeptAnswer => {
    let newDept = newDeptAnswer.addNewDept;
    let newDeptSql = "INSERT INTO department (dept_name) VALUES (?)";
        connection.query(newDeptSql, newDept, (err) => {
            if (err) throw err;
            console.log("New department added!")
            viewDepts();
               });
            }); 
}

  function updateEmployee () {
    let roleQuery = "SELECT roles.id, roles.title FROM roles"
    let employeeQuery = "SELECT id, first_name, last_name FROM employees";
    connection.query(employeeQuery, function(err, results) {
        if (err) throw err;
        let employee = results.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}));
        inquirer.prompt([
            {
                name: "chooseEmp",
                type: "list",
                message: "Which employee would you like to edit?",
                choices: employee
            }
        ])
        .then(employeeAnswer => {
            connection.query(roleQuery, function (err, results) {
                  if (err) throw err;
                  let role = results.map(({id, title}) => ({name: title, value: id}));   
                    inquirer.prompt([
                        {
                            name: "updatedRole",
                            type: "list",
                            message: "What is the employee's new role?",
                            choices: role
                        }
                    ])
                    .then(roleAnswer => {
                        updateEmp = `UPDATE employees SET role_id = ${roleAnswer.updatedRole} WHERE id = ${employeeAnswer.chooseEmp}`
                        connection.query(updateEmp, (err) => {
                            if (err) throw err;
                            console.log("Employee successfully updated! \n")
                            viewEmployees();
                    });
                });
            });
        }); 
     });
  }


  function updateManager () {
    let employeeQuery = "SELECT id, first_name, last_name FROM employees";
    connection.query(employeeQuery, function(err, results) {
        if (err) throw err;
        let employees = results.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}));
        inquirer.prompt([
            {
                name: "chooseEmp2",
                type: "list",
                message: "Which employee would you like to edit?",
                choices: employees
            }
        ])
        .then(employeeAnswer => {
            let managerQuery = "SELECT id, first_name, last_name FROM employees"
            connection.query(managerQuery, function (err, results) {
                  if (err) throw err;
                  let managers = results.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}));   
                    inquirer.prompt([
                        {
                            name: "updatedManager",
                            type: "list",
                            message: "Who is the employee's new manager?",
                            choices: managers
                        }
                    ])
                    .then(managerAnswer => {
                        let updateMgr = `UPDATE employees SET manager_id = ${managerAnswer.updatedManager} WHERE id = ${employeeAnswer.chooseEmp2}`
                        connection.query(updateMgr, (err) => {
                            if (err) throw err;
                            console.log("Manager successfully updated! \n")
                            viewEmployees();
                    });
                });
            });
        }); 
     });
  }

  function deleteEmployee () {
    let employeeQuery = "SELECT id, first_name, last_name FROM employees";
    connection.query(employeeQuery, function(err, results) {
        if (err) throw err;
        let employees = results.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}));
        inquirer.prompt([
            {
                name: "deleteEmp",
                type: "list",
                message: "Which employee would you like to delete?",
                choices: employees
            },
            {
                name: "confirmDelete",
                type: "confirm",
                message:"Confirm deletion?",
                default: false
            }
        ])
        .then(deleteAnswer => {
            let deleted = `DELETE FROM employees WHERE id = ${deleteAnswer.deleteEmp}`
            connection.query(deleted, (err) => {
                if (err) throw err;
                console.log("Employee deleted! \n")
                viewEmployees();
                        })
                    })
    })
}

  function deleteRole () {
    let roleQuery = "SELECT roles.id, roles.title FROM roles";
    connection.query(roleQuery, function(err, results) {
        if (err) throw err;
        let role = results.map(({id, title}) => ({name: title, value: id}));   
        inquirer.prompt([
            {
                name: "deleteRoles",
                type: "list",
                message: "Which role would you like to delete?",
                choices: role
            },
            {
                name: "confirmDelete",
                type: "confirm",
                message:"Confirm deletion?",
                default: false
            }
        ])
        .then(deleteAnswer => {
            let deleted = `DELETE FROM roles WHERE id = ${deleteAnswer.deleteRoles}`
            connection.query(deleted, (err) => {
                if (err) throw err;
                console.log("Role deleted! \n")
                viewRoles();
                        })
                    })
    })
  }

  function deleteDept () {
    let deptQuery = "SELECT department.id, department.dept_name FROM department";
    connection.query(deptQuery, function(err, results) {
        if (err) throw err;
        let depts = results.map(({id, dept_name}) => ({name: dept_name, value: id}));   
        inquirer.prompt([
            {
                name: "deleteDepts",
                type: "list",
                message: "Which department would you like to delete?",
                choices: depts
            },
            {
                name: "confirmDelete",
                type: "confirm",
                message:"Confirm deletion?",
                default: false
            }
        ])
        .then(deleteAnswer => {
            let deleted = `DELETE FROM department WHERE id = ${deleteAnswer.deleteDepts}`
            let deleteRole = `DELETE FROM roles WHERE department_id = ${deleteAnswer.deleteDepts}`
            connection.query(deleted, (err) => {
                if (err) throw err;
            })
            connection.query(deleteRole, (err) => {
                if (err) throw err;
                console.log("Department deleted successfully!");
                viewDepts();
            }) 
        })
     })
  }


 