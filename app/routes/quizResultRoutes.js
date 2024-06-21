const Router = require('koa-router');
const quizResultController = require('../controllers/quizResultController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = new Router();

router.post('/add-quiz-result', authMiddleware, quizResultController.addQuizResult);
router.get('/user-results/:userId', quizResultController.fetchUserResults);
router.get('/user-results-by-topic/:userId/:topicId', quizResultController.fetchUserResultsByTopic);

module.exports = router;
