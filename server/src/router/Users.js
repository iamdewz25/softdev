//api
const express = require("express")
const users = express.Router()
const cors = require("cors")
var mysql = require('mysql');
const jwt = require("jsonwebtoken")
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "iamdewz25",
  database: "testsoftdev"

});
users.use(cors())

process.env.SECRET_KEY = 'secret'


users.post("/register", (req, res) => {
  const data = [
    req.body.username,
    req.body.password,
    req.body.role
  ]
  //add to db
  con.connect(function (err) {

    console.log("Connected!: Checking");
    con.query(`SELECT USERNAME FROM user_table WHERE USERNAME = '${data[0]}'`, function (err, result) {
      console.log(data)
      if (err) throw err;

      if (result.length > 0) {
        message = "Username already exits"
        res.send(message)
        console.log("Username is already exits")
      } else {
        console.log("Add Data to DB");
        var sql = `INSERT INTO user_table (USERNAME,PASSWORD,ROLE) VALUES ('${data[0]}','${data[1]}','${data[2]}')`;
        console.log(sql)
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
        res.send("Registered")
      }

    });
  });
  //
})

users.post('/login', (req, res) => {
  const dataLogin = [
    req.body.username,
    req.body.password
  ]

  con.connect(function (err) {

    console.log("Connected!: Checking");
    con.query(`SELECT * FROM user_table WHERE USERNAME = '${dataLogin[0]}' AND PASSWORD = '${dataLogin[1]}'`, function (err, result) {
      //console.log(dataLogin)
      if (err) throw err;

      if (result.length > 0) {
        dataLogin.push(result[0].ROLE)
       // console.log(dataLogin)
        let token = jwt.sign({
          dataLogin
        }, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.send(token)
        console.log("Send token")
      } else {
        message = "No username"
        console.log(message)
        res.send(message)
        //res.send(message)
      }

    });
  });

})


users.post("/datacontrol", (req, res) => {
  const dataLogin = [
    req.body.username,
    req.body.role
  ]
  console.log(dataLogin)
  var data = []
  con.connect(function (err) {
    con.query(`SELECT * FROM user_table`, function (err, result) {
      console.log(result[0])
    for (i = 0;i < result.length;i++){
      data.push(result[i])
     //data.push(result[i].PASSWORD)
     // data.push(result[i].ROLE)

    }
    
    console.log(data)
    res.send(data)


    });
    

  });

})



module.exports = users