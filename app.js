//----Dependencies------//
const inquirer = require("inquirer");
const mysql = require ("mysql");
const cTable = require("console.table");

const connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
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

              "View All Employee",
               "View All Deparments",
               "View All Role",
               "Add Employee",
               "Add Department",
               "Add Role",
               "Update Employee",
               "EXIT"
               
             ]
    }

]).then(function(answer) {
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
     
      case  "Add Employee":
            addEmployee();     
            break; 
      case  "Add Department":
            addDepartment(); 
            break;  
      case   "Add Role":
              addRole();        
            break;
      case  "UpdateEmployee":
            UpdateEmployee();            
            break;
      case   "EXIT":
            endApp();
     }
 })


}
// startPrompt()

//------view Employee---------//

function viewAllEmployee() {
  var query = "SELECT * FROM employee";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.log(res.length + "employee found!");
    console.table("all employee:" ,res)
    
  });
}

// viewAllEmployee()

//------View by Department-------//

  function viewAllDepartment() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
      console.table(res) 
      // startPrompt()
    });
  }
// viewDepartment()

//--------View Role-------------//

 function viewAllRole() {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
      console.table(res) 
      // startPrompt()
    });
  }

// viewAllRole()



//-------Add Employee----------//

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

//  addEmployee()


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
       connection.query(query, function(err, res){
          if (err)throw err;
          console.table("ALL Department:" , res);
          // startPrompt()
       })
           
  })

}
// console.log(answer)
// addDepartment()

//----------Add Role------------//
