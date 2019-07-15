const express = require('express')
const bodyParser = require ('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const home = res => res.status(200).json('hello omar')
app.get('/',(req,res) => home (res));

require('./app/routes/note.routes.js')(app);

app.listen(4000, () => console.log('server 4000'))