//----Dependencies------//
const inquirer = require("inquirer");
const mysql = require ("mysql");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Liebeberlin",
    database: "employee_trackerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as Id" + connection.threadId)
    startPrompt();
  });
  
function startPrompt() {
     inquirer.prompt([

    {
     type: "list",
     message: "What would you like to do?",
     name: "choice",
     choices: [
               "View All Employees",
               "View All Employee's by Role",
               "View All Employees by Deparments",
               "Update Employee",
               "Add Employee",
               "Add Role",
               "Add Department"
             ]
    }

]).then(function(answer) {
    switch (answer.action) {

      case "View all Employee by Department":
           viewAllDepartment();

      case "View All Employee by Role":
           viewAllEmployeeRole();
           
      case  "Add Employee":
            addEmployee();     
       

      case   "View All Employee":
              viewAllEmployee();


      case  "Updated Employee":
               updateEmployee();
      
               
      case    "Add Role":
                 addRole();
                 
      case     "Add Department":
                 addDepartment();           

     }
 })


}
//  console.log(startPrompt)

//----View by Department----//

  function viewDepartment() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
      console.table(res) 
      
    });
  }

//-----Select Role-----//

 function viewRole() {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
      console.table(res) 
      
    });
  }

//-----Add Employee---//

 function addEmployee() {
    var query = "SELECT * FROM role";
    var rolechoice = [];
    connection.query(query, function(err, res) {

      for (var i = 0; i < res.length; i++) {
          var role = { 
              value:res[i].id,
              name: res[i].title
              
        }

      rolechoice.push(role)
    
    }
      inquirer.prompt([

      {   
          type: "list",
          name: "role",
          message: "what is your role?",
          choices: rolechoice
      },

    ]).then(function (res) {console.log(res) })
  })

 } 

//  addEmployee()