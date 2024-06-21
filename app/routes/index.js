const Router = require('koa-router');
const userRoutes = require('./userRoutes');
const topicRoutes = require('./topicRoutes');
const termRoutes = require('./termRoutes');
const quizResultRoutes = require('./quizResultRoutes');

const router = new Router();

router.use(userRoutes.routes(), userRoutes.allowedMethods());
router.use(topicRoutes.routes(), topicRoutes.allowedMethods());
router.use(termRoutes.routes(), termRoutes.allowedMethods());
router.use(quizResultRoutes.routes(), quizResultRoutes.allowedMethods());

module.exports = router;
