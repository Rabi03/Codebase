const express = require('express');
const { getPromotions } = require('../controllers/promotionControllers.js');
const { isAuthenticated, authorizedRols } = require('../middleware/auth');
const router=express.Router();

router.route('/').get(isAuthenticated,getPromotions);

module.exports = router;