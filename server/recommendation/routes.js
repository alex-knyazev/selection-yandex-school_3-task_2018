const express = require('express');

const router = express.Router();
const { findRecommendationRooms } = require('./findRecommendationRooms');

router.post('/getRecommendations', findRecommendationRooms);
router.post('/', findRecommendationRooms);

module.exports = router;
