const express = require('express');

const router = express.Router();
const authcontrollers = require('../controllers/authcontrollers');

router.get('/',authcontrollers.getLS);
router.post('/login',authcontrollers.postLogin);
router.post('/signup',authcontrollers.postSignup);
router.get('/logout',authcontrollers.getLogout);
router.get('/homepage',authcontrollers.getHomepage);

module.exports = router;