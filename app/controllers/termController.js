const dbManager = require('../managers/dbManager');

module.exports = {
  fetchTermsByTopic: async (ctx) => {
    const { topicId } = ctx.params;
    const connection = await dbManager.connectDB();
    try {
      const [rows] = await connection.execute('SELECT * FROM terms WHERE topic_id = ?', [topicId]);
      ctx.body = rows;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: 'Error fetching terms', error };
    } finally {
      await connection.end();
    }
  },
};
