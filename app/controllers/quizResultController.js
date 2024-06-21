const dbManager = require('../managers/dbManager');

module.exports = {
  addQuizResult: async (ctx) => {
    const { termId, userAnswer, isCorrect } = ctx.request.body;
    const userId = ctx.state.user.id;

    const connection = await dbManager.connectDB();
    try {
      await connection.execute(
        'INSERT INTO quiz_results (term_id, user_id, user_answer, is_correct) VALUES (?, ?, ?, ?)',
        [termId, userId, userAnswer, isCorrect],
      );
      ctx.status = 201;
      ctx.body = { message: 'Quiz result added successfully' };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: 'Error adding quiz result', error };
    } finally {
      await connection.end();
    }
  },

  fetchUserResults: async (ctx) => {
    const { userId } = ctx.params;
    const connection = await dbManager.connectDB();
    try {
      const [results] = await connection.execute(`
        SELECT quiz_results.id,
              terms.id AS termId,
              topics.id AS topicId,
              terms.term,
              topics.name AS topic,
              terms.definition AS correctAnswer, 
              quiz_results.user_answer AS userAnswer,
              quiz_results.is_correct AS isCorrect
        FROM quiz_results
        JOIN terms ON quiz_results.term_id = terms.id
        JOIN topics ON terms.topic_id = topics.id
        WHERE quiz_results.user_id = ?
        ORDER BY quiz_results.id DESC
      `, [userId]);
      ctx.body = results;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Failed to fetch user results' };
      console.error('Failed to fetch user results:', error);
    } finally {
      await connection.end();
    }
  },

  fetchUserResultsByTopic: async (ctx) => {
    const { userId, topicId } = ctx.params;
    const connection = await dbManager.connectDB();
    try {
      const [results] = await connection.execute(`
        SELECT quiz_results.id,
              terms.id AS termId,
              topics.id AS topicId,
              terms.term,
              topics.name AS topic,
              terms.definition AS correctAnswer, 
              quiz_results.user_answer AS userAnswer,
              quiz_results.is_correct AS isCorrect,
              COALESCE((SELECT definition FROM terms WHERE id = quiz_results.user_answer), 'No Answer') AS userAnswer
        FROM quiz_results
        JOIN terms ON quiz_results.term_id = terms.id
        JOIN topics ON terms.topic_id = topics.id
        WHERE quiz_results.user_id = ? AND topics.id = ?
        ORDER BY quiz_results.id DESC
      `, [userId, topicId]);
      ctx.body = results;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Failed to fetch user results by topic' };
      console.error('Failed to fetch user results by topic:', error);
    } finally {
      await connection.end();
    }
  },
};
