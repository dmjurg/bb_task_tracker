'use strict';

// dependencies
const mongoose = require('mongoose');
// mongoose.connect(sever);
// set database name
const dbName = "task-api";

// connect to the database
mongoose.connect(`mongodb://localhost/${dbName}`);

//get notified if connection was successful or not
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Connected to the ${dbName} database`);
})