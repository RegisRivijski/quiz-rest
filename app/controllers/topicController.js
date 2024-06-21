const dbManager = require('../managers/dbManager');

module.exports = {
  fetchTopics: async (ctx) => {
    const connection = await dbManager.connectDB();
    try {
      const [rows] = await connection.execute('SELECT * FROM topics');
      ctx.body = rows;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: 'Error fetching topics', error };
    } finally {
      await connection.end();
    }
  },
};
