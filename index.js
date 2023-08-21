const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./config/connection");

const questions = [
  {
    type: "list",
    message: "Please select an option",
    name: "option",
    choices: [
      "View all departments",
      "Add a department",
      "View all roles",
      "Add a role",
      "View all employees",
      "Add an employee",
      "Update employee info",
      "Exit",
    ],
  },
];

function init() {
    inquirer.prompt(questions).then((answers) => {
      if (answers.option == "View all departments") {
        viewDepartments();
      } else if (answers.option == "Add a department") {
        addDepartment();
      } else if (answers.option == "View all roles") {
        viewRoles();
      } else if (answers.option == "Add a role") {
        addRole();
      } else if (answers.option == "View all employees") {
        viewEmployees();
      } else if (answers.option == "Add an employee") {
        addEmployee();
      } else if (answers.option == "Update employee info") {
        updateEmployee();
      } else if (answers.option == "Exit") {
        console.log("Exit");
        process.exit();
      }
    });
}

function viewDepartments() {
  const queryString = "SELECT * FROM department;";
  db.query(queryString, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    console.table(result);
    init();
  });
}

function viewRoles() {
  const queryString =
    "SELECT role.id, role.title, role.salary, department.name as department FROM role INNER JOIN department ON role.department_id = department.id;";
  db.query(queryString, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    console.table(result);
    init();
  });
}

function viewEmployees() {
  const queryString = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS department
  FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;`;
  db.query(queryString, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    console.table(result);
    init();
  });
}

function addDepartment() {
  const departmentQ = [
    {
      type: "input",
      name: "department_name",
      message: "Please enter the name of the new department:",
    },
  ];

  inquirer.prompt(departmentQ).then((answers) => {
    const queryString = `INSERT INTO department (name) VALUES ('${answers.department_name}');`;
    db.query(queryString, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.table(result);
      init();
    });
  });
}

function addRole() {
  const departmentQuery = `SELECT * FROM department;`;
  db.query(departmentQuery, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    const departmentChoices = result.map((department) => ({
      name: department.name,
      value: department.id,
    }));

    const roleQ = [
      {
        type: "input",
        name: "title",
        message: "Please enter the title of the new role:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary for this role:",
      },
      {
        type: "list",
        name: "department_id",
        message: "Select the department for this role:",
        choices: departmentChoices,
      },
    ];

    inquirer.prompt(roleQ).then((roleAnswers) => {
      const queryString = `INSERT INTO role (title, salary, department_id) VALUES ('${
        roleAnswers.title
      }', ${parseFloat(roleAnswers.salary)}, ${roleAnswers.department_id});`;

      db.query(queryString, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log("New role added sucessfully!");
        init();
      });
    });
  });
}

function addEmployee() {
  const roleQuery = `SELECT * FROM role;`;
  db.query(roleQuery, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    const roleChoices = result.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    const employeeQ = [
      {
        type: "input",
        name: "first_name",
        message: "What is the employees first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employees last name?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the employees role?",
        choices: roleChoices,
      },
    ];

    inquirer.prompt(employeeQ).then((answers) => {
      const queryString = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answers.first_name}', '${answers.last_name}', ${answers.role_id});`;
      db.query(queryString, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log("New employee added successfully!");
        init();
      });
    });
  });
}

function updateEmployee() {
  const employeeQuery = `SELECT * FROM employee;`;
  db.query(employeeQuery, (err, employeeResult) => {
    if (err) {
      console.log(err);
      return;
    }

    const employeeChoices = employeeResult.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));

    const roleQuery = `SELECT * FROM role;`;
    db.query(roleQuery, (err, roleResult) => {
      if (err) {
        console.log(err);
        return;
      }

      const roleChoices = roleResult.map((role) => ({
        name: role.title,
        value: role.id,
      }));

      const updateEmployeeQ = [
        {
          type: "list",
          name: "employee_id",
          message: "Select the employee to update:",
          choices: employeeChoices,
        },
        {
          type: "input",
          name: "new_first_name",
          message: "Enter the new first name:",
        },
        {
          type: "input",
          name: "new_last_name",
          message: "Enter the new last name:",
        },
        {
          type: "list",
          name: "new_role_id",
          message: "Select the new role for the employee:",
          choices: roleChoices,
        },
      ];

      inquirer.prompt(updateEmployeeQ).then((answers) => {
        const queryString = `UPDATE employee SET first_name = '${answers.new_first_name}', last_name = '${answers.new_last_name}', role_id = ${answers.new_role_id} WHERE id = ${answers.employee_id};`;
        db.query(queryString, (err, result) => {
          if (err) {
            console.log(err);
            return;
          }

          console.log("Employee information updated successfully!");
          init();
        });
      });
    });
  });
}

init();
