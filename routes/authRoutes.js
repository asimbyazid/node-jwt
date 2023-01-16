const {Router} = require('express')
const router = Router();
const authController = require('../controllers/authControllers')

router.get('/signup',authController.signup_get_controller)

router.post('/signup',authController.signup_post_controller)

router.get('/login',authController.login_get_controller)

router.post('/login',authController.login_post_controller)

router.get('/logout',authController.logout_get_controller)


module.exports = router;