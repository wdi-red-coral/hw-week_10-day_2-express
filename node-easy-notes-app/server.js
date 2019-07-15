
const express = require('express')
const bodyParser = require('body-parser')

const dbConfig = require('./config/database.config.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect( dbConfig.url, {
    useNewUrlParser: true    
})
.then( () => {console.log("Successfully connected to the database")})
.catch( (error) =>{console.log('Could not connect to the database. Exiting now...', error)
process.exit()
})

const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded( {extended: true} ))

app.get('/', (request, response) => {
    response.json({"message":  "Welcome to EasyNotes application."})
})

require('./app/routes/note.routes.js')(app)

app.listen(3000, () => { console.log("Hey, you're server is using port 3000 !") })
