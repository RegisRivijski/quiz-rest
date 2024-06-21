const Router = require('koa-router');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = new Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/update-email', authMiddleware, userController.updateUserEmail);
router.put('/update-password', authMiddleware, userController.updateUserPassword);

module.exports = router;
