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
    // startPrompt();
  });
  














//----View by Department----//

  function selectDepartment() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
      console.table(res) 
      
    });
  }

//-----Select Role-----//

 function selectRole() {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
      console.table(res) 
      
    });
  }


//-----
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
 addEmployee()