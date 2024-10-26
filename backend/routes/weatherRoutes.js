const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Search weather for a city
router.get('/search', weatherController.searchWeather);

module.exports = router;
