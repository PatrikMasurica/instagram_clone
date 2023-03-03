const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController')
const { ensureAuth } = require('../middlewares/auth')

router.get('/', ensureAuth, mainController.getHome)
router.get('/profile', mainController.getProfile)
router.get('/login', mainController.getLogin)
router.post("/login", mainController.postLogin);
router.get('/signup', mainController.getSignUp)
router.post("/signup", mainController.postSignUp);
router.get("/logout", mainController.logout);

module.exports = router