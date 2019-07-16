const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const home = res => res.status(200).json('Hello, World!!');
app.get('/', (req, res) => home(res));

require('./app/routes/note.routes.js')(app);

app.listen(8888, () => console.log('Server App run at 3000 port'));