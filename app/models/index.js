const dbConfig = require('../config/db.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.url = dbConfig.url;

// get tutorial model
db.tutorials = require('./tutorial.model')(mongoose); 

// export db objects

module.exports = db;