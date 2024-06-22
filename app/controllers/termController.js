const dbManager = require('../managers/dbManager');

module.exports = {
  fetchTermsByTopic: async (ctx) => {
    const { topicId } = ctx.params;
    const connection = await dbManager.connectDB();
    try {
      const [terms] = await connection.execute('SELECT * FROM terms WHERE topic_id = ?', [topicId]);
      ctx.body = terms;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: 'Error fetching terms', error };
    } finally {
      await connection.end();
    }
  },

  fetchTopicById: async (ctx) => {
    const { topicId } = ctx.params;
    const connection = await dbManager.connectDB();
    try {
      const [topics] = await connection.execute('SELECT * FROM topics WHERE id = ?', [topicId]);
      if (topics.length === 0) {
        ctx.status = 404;
        ctx.body = { message: 'Topic not found' };
        return;
      }
      const topic = topics[0];
      const [terms] = await connection.execute('SELECT * FROM terms WHERE topic_id = ?', [topicId]);
      topic.terms = terms;
      ctx.body = topic;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: 'Error fetching topic', error };
    } finally {
      await connection.end();
    }
  },
};
