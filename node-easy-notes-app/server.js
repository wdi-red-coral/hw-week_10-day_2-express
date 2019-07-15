const express = require('express')
const bodyParser = require('body-parser')
// create express app
const app = express()

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// config db
const dbConfig = require('./config/database.config.js')
const mongoose = require('mongoose')
 mongoose.Promise = global.Promise

 // connect to db
 mongoose.connect(dbConfig.url, {
     useNewUrlParser: true
 }).then(()=>{
     console.log("Successfully connected to the database")
 }).catch(error => {
     console.log("Could not connect to the database. Exiting now ....", error)
     process.exit()
 })

// routes
app.get('/', (req, res)=>{
    res.json({"message": "Welcome to EasyNotes Application. Take notes quickly. Organize and keep track of all your notes"})
})

// require notes routes
require('./app/routes/note.routes.js')(app)

// Listen for requests
app.listen(3000, ()=>{
    console.log("Server is listening on port 3000")
})