const Router = require('koa-router');
const topicController = require('../controllers/topicController');

const router = new Router();

router.get('/topics', topicController.fetchTopics);

module.exports = router;
