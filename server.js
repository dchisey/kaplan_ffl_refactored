const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Result = require('./server/models');
const routes = require('./server/routes');

//bring in dotenv variables
require('dotenv').config();

const PORT = process.env.PORT || 8080;
// const URI = process.env.DB_URI;
const URI = 'mongodb://localhost/kaplanFfl'

console.log(`env: ${process.env.PORT} || selectedPort: ${PORT}`)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

//add middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

mongoose.Promise = global.Promise;

//easy debugging
mongoose.set('debug', true);

//open the connection to the database
mongoose.connect(URI, {
  keepAlive: true
})

//handle events from DB opening
mongoose.connection.on('error', console.error.bind(console, 'Connection error: '));
mongoose.connection.once('open', function() {
	console.log('Connection to MongoDB is live. Database: ' + mongoose.connection.name);
})

//pull in routes from routes.js
routes(app);

//start web server
app.listen(PORT, (req, res) => {
	console.log('Server live on port ' + PORT);
});

