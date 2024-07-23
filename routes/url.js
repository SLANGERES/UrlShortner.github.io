const express = require('express');
const URL = require('../models/url');
const { handleGenerateShortUrl, handleAnalyticsUrl } = require('../controller/url');
const router = express.Router();

// POST route to generate short URL
router.post('/', handleGenerateShortUrl);

// GET route for analytics
router.get('/analytics/:shortId', handleAnalyticsUrl);

module.exports = router;
