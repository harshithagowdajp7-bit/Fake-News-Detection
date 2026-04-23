const express = require('express');
const { analyzeNews, getHistory, getStats } = require('../controllers/newsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/analyze', analyzeNews);
router.get('/history', getHistory);
router.get('/stats', getStats);

module.exports = router;
