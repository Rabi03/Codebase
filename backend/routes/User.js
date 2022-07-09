const { registration, login, getCurrentUser,logout } = require('../controllers/userControllers');

const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const router=express.Router();

router.route('/register').post(registration);

router.route("/login").post(login);
router.route("/logout").get(logout);

router.route('/me').get(isAuthenticated,getCurrentUser);

module.exports = router;
