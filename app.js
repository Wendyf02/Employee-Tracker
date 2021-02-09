//----Dependencies------//
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

const connection = mysql.createConnection({

  host: "localhost",
  port: 3306,
  user: "root",
  password: "Liebeberlin",
  database: "employee_trackerDB"

});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as Id" + connection.threadId)
  startPrompt();
});

function startPrompt() {
  inquirer.prompt([

    {
      type: "list",
      message: "Welcome to our employee database! What would you like to do?",
      name: "action",
      choices: [

        "View All Employee",
        "View All Department",
        "View All Role",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee",

      ]
    }

  ]).then(function (answer) {
    switch (answer.action) {

      case "View All Employee":
        viewAllEmployee();
        break;

      case "View All Department":
        viewAllDepartment();
        break;

      case "View All Role":
        viewAllRole();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "Add Department":
        addDepartment();
        break;

      case "Add Role":
        addRole();
        break;

      case "Update Employee":
        UpdateEmployee();
        break;
  
    }
  })
}


//------view Employee---------//

function viewAllEmployee() {
  var query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res.length + "employee found!");
    console.table("all employee:", res)
    startPrompt()
  });
}



//------View by Department-------//

function viewAllDepartment() {
  var query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res)
    startPrompt()
  });
}



//--------View Role-------------//

function viewAllRole() {
  var query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res)
    startPrompt()
  });
}


//-------select role----------//

function addEmployee() {
  var query = "SELECT * FROM role";
  var rolechoice = [];
  connection.query(query, function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      var role = {
        value: res[i].id,
        name: res[i].title

      }

      rolechoice.push(role)

    }
    inquirer.prompt([

      {
        name: "first_name",
        type: "input",
        message: "Employee first name:",
      },

      {
        name: "last_name",
        type: "input",
        message: "Employee last name:",

      },

      {
        type: "list",
        name: "role",
        message: "what is your role?",
        choices: rolechoice
      },

    ]).then(function (answer) {
      console.log(answer)
      connection.query("INSERT INTO employee SET?",

        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          manager_id: 1,
          role_id: answer.role

        }, function (err) {

          if (err) throw err
          console.table(answer)
          startPrompt()

        })

    })
  })

}


//--------Add Department-------//

function addDepartment() {

  inquirer.prompt([
    {
      name: "new_dept",
      type: "input",
      message: "what Department would you like to add?"

    }
  ]).then(function (answer) {
    connection.query(
      "INSERT INTO  department SET? ",
      {
        name: answer.new_dept
      },
    );
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table("ALL Department:", res);
      startPrompt()
    })

  })

}


//----------Add Role------------//


function addRole() {

  var query = "SELECT * FROM department";
  var departmentchoice = [];
  connection.query(query, function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      var department = {
        value: res[i].id,
        name: res[i].name

      }

      departmentchoice.push(department)

    }

    connection.query("SELECT role.title AS title, role.salary AS SALARY FROM role", function (err, res) {
      if (err) throw err;

      inquirer
        .prompt([
           
          {
            type: "list",
            name: "department",
            message: "what is the department?",
            choices: departmentchoice
          },

          {
            name: "Title",
            type: "input",
            message: "What is the Title of the new role?"
          },

          {
            name: "Salary",
            type: "input",
            message: "What is the Salary for this position?"

          }

        ]).then(function (answer) {
          connection.query(
            "INSERT INTO role SET?",
            {
              title: answer.Title,
              salary: answer.Salary,
              department_id: answer.department
            },

            function (err) {
              if (err) throw err
              console.table(res);
              startPrompt();
            }

          )

        })
    })
  })
}


///-------------Update Employee------------////


function UpdateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "Update"
      },

      {
        type: "input",
        message: "What do you want to update?",
        name: "UpdateRole"
      },

    ]).then(function (answer) {

      connection.query("UPDATE employee SET role_id=? WHERE first_name=?", [answer.updateRole, answer.Update], function (err, res) {
        if (err) throw err;
        console.table(res)
        startPrompt();

      })
    })
}

