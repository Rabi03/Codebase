const express = require('express');
const router=express.Router();

const {
    fetchChannels, getChannelMembers,
  } = require("../controllers/channelControllers");
const { authorizedMember, isAuthenticated } = require('../middleware/auth');


router.route("/").get(isAuthenticated,fetchChannels);
router.route("/:community_id").get(isAuthenticated,getChannelMembers);
module.exports = router;
