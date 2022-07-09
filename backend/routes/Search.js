const express = require('express');
const router=express.Router();

const { searchCourse, searchCommunity } = require('../controllers/searchControllers');
const { isAuthenticated } = require('../middleware/auth');


router.route('/course').get(isAuthenticated,searchCourse);
router.route('/community').get(isAuthenticated,searchCommunity);

module.exports = router;