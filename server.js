// package imports
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressValidator = require('express-validator');

// nessesary dependency import
const app = express();
const postRoute = require('./routes/post');

// db
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => {
    console.log('DB Connected!');
});
 
mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
})

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(expressValidator());

// ports
const port = process.env.APP_PORT || 3000;

// routes
app.use('/', postRoute);

// server
app.listen(port, () => {
    console.log('Server running on: ', port);
}) 