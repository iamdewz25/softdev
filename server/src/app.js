// import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express() // create your express app
const Users = require('./router/Users')
// make app use dependencies
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/users',Users)


app.get('/',(req,res)=>{
    res.send(console.log("Hello"))
})
app.listen(process.env.PORT || 8081,()=>console.log("app listening on port 8081")) // client is already running on 8080