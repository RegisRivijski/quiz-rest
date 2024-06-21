const mysql = require('mysql2/promise');
const { dbConfig } = require('config');

module.exports = {
  connectDB: async () => {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
  },
};
