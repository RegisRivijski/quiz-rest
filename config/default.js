module.exports = {
  dbConfig: {
    host: process.env.MYSQL_1_HOSTNAME,
    port: process.env.MYSQL_1_PORT,
    user: process.env.MYSQL_1_USER,
    password: process.env.MYSQL_1_PASSWORD,
    database: 'it_vocabulary',
  },
  jwtSecret: process.env.IT_VOCABULARY_JWT_SECRET,
};
