const Router = require('koa-router');
const termController = require('../controllers/termController');

const router = new Router();

router.get('/terms/:topicId', termController.fetchTermsByTopic);

module.exports = router;
