const inquirer = require('inquirer');
const mysql = require('mysql');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1590',
  database: 'employees_db',
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.');

  // Start the application
  start();
});

// Function to start the application and present options to the user
function start() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          connection.end();
          break;
      }
    });
}

// Function to view all departments
function viewDepartments() {
  connection.query('SELECT * FROM departments', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// Function to view all roles
function viewRoles() {
  connection.query(
    'SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles INNER JOIN departments ON roles.department_id = departments.id',
    (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
}

// Function to view all employees
function viewEmployees() {
  connection.query(
    'SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees managers ON employees.manager_id = managers.id',
    (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        name: 'name',
        type: 'input',
        message: 'Enter the name of the department:',
      },
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO departments SET ?',
        {
          name: answer.name,
        },
        (err) => {
          if (err) throw err;
          console.log('Department added successfully!');
          start();
        }
      );
    });
}

// Function to add a role
function addRole() {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'Enter the title of the role:',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'Enter the salary for the role:',
      },
      {
        name: 'department',
        type: 'input',
        message: 'Enter the department ID for the role:',
      },
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO roles SET ?',
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department,
        },
        (err) => {
          if (err) throw err;
          console.log('Role added successfully!');
          start();
        }
      );
    });
}

// Function to add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: "Enter the employee's first name:",
      },
      {
        name: 'last_name',
        type: 'input',
        message: "Enter the employee's last name:",
      },
      {
        name: 'role',
        type: 'input',
        message: "Enter the employee's role ID:",
      },
      {
        name: 'manager',
        type: 'input',
        message: "Enter the employee's manager ID (optional):",
      },
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO employees SET ?',
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role,
          manager_id: answer.manager || null,
        },
        (err) => {
          if (err) throw err;
          console.log('Employee added successfully!');
          start();
        }
      );
    });
}

// Function to update an employee role
function updateEmployeeRole() {
  connection.query('SELECT * FROM employees', (err, employees) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: 'employee',
          type: 'list',
          message: 'Select the employee to update:',
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
        {
          name: 'role',
          type: 'input',
          message: 'Enter the new role ID for the employee:',
        },
      ])
      .then((answer) => {
        connection.query(
          'UPDATE employees SET ? WHERE ?',
          [
            {
              role_id: answer.role,
            },
            {
              id: answer.employee,
            },
          ],
          (err) => {
            if (err) throw err;
            console.log('Employee role updated successfully!');
            start();
          }
        );
      });
  });
}

