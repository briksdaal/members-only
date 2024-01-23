const mongoose = require('mongoose');
const debug = require('debug')('membersonly:db');

const User = require('./models/user');
const Message = require('./models/message');

mongoose.set('strictQuery', false);

const dev_db_url = 'mongodb://127.0.0.1:27017/membersonly';

const mongoDB = process.env.MONGODB_URI || dev_db_url;

main().catch((err) => debug(err));

async function main() {
  await mongoose.connect(mongoDB);
  debug('connected');
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

module.exports = db;
