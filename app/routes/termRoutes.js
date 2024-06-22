const Router = require('koa-router');
const termController = require('../controllers/termController');

const router = new Router();

router.get('/terms/:topicId', termController.fetchTermsByTopic);
router.get('/topic/:topicId', termController.fetchTopicById);

module.exports = router;
