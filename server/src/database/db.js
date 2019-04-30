var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "user"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM user_table WHERE USERNAME = 'karin'", function (err, result) {
    if (err) throw err;
    
    if(result.length > 0 ){
    console.log("y")
    console.log(typeof(result[0].ROLE));
    }else 
    console.log("No")

  });

  
});