/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */
router.use('/question', require('./api/questionRoutes'));

module.exports = router;