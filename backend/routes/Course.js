const express = require('express');
const { createCourse,enrollCourse, getCourse, } = require('../controllers/courseControllers');
const { isAuthenticated, authorizedRols,isAdmin, authorizedMember } = require('../middleware/auth');
const router=express.Router();

router.route('/:community_id/create').post(isAuthenticated,authorizedRols(2),isAdmin,createCourse);
router.route('/:community_id/enroll').post(isAuthenticated,authorizedRols(1),authorizedMember,enrollCourse);
router.route('/:course_id').get(isAuthenticated,getCourse);

module.exports = router;