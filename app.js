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
     message: "Welcome to our employee database! What would you like to do?",
     name: "choice",
     choices: [

               "View All Deparments",
               "View All Role",
               "View All Employee",
               "Add Department",
               "Add Role",
               "Add Employee",
               "Add Department",
               "EXIT"
               
             ]
    }

]).then(function(answer) {
    switch (answer.action) {

      case "View All Department":
           viewAllDepartment();
           break;
      case "View All Role":
           viewAllRole();
          break;
      case "View All Employee":
            viewAllEmployee();
            break;
      case  "Add Department":
            addDepartment(); 
            break;  
      case   "Add Role":
              addRole();        
            break;
      case  "Add Employee":
            addEmployee();     
            break; 
      case  "Add Department":
            AddEmployee();            
            break;
      case   "EXIT":
            endApp();
     }
 })


}
//  console.log(startPrompt)

//----View by Department----//

  function viewAllDepartment() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
      console.table(res) 
      
    });
  }
// viewDepartment()

//-----Select Role-----//

 function viewAllRole() {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
      console.table(res) 
      
    });
  }

// viewAllRole()


//----view Employee----//

function viewAllEmployee() {
  var query = "SELECT * FROM employee";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.log(res.length + "employee found!");
    console.table("all employee:" ,res)
    
  });
}

// viewAllEmployee()


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
        name: "first_name",
        type: "input",
        meassage: "Employee first name:",
      },

      {
        name: "last_name",
        type: "input",
        meassage: "Employee last name:",

      },

      {   
          type: "list",
          name: "role",
          message: "what is your role?",
          choices: rolechoice
      },

    ]).then(function (res) {console.log(res) })
  })

 } 

 addEmployee()
