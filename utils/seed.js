const connection = require('../config/connection');
const { } = require('../models');
const { } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  process.exit(0);
});
