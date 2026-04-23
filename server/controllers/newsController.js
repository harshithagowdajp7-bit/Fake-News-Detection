const News = require('../models/News');

// Suspicious keywords
const SUSPICIOUS_KEYWORDS = [
    'breaking', 'shocking', '100% guarantee', 'miracle cure', 'conspiracy',
    'secret revealed', 'don\'t want you to know', 'official leak', 'unbelievable',
    'hidden truth', 'magical', 'scam', 'fraud'
];

// @desc    Analyze news text
// @route   POST /api/news/analyze
exports.analyzeNews = async (req, res) => {
    try {
        const { content, inputType } = req.body;
        
        if (!content) {
            return res.status(400).json({ success: false, error: 'Please provide content to analyze' });
        }

        let explanation = [];
        let score = 100;

        // 1. Check for suspicious keywords
        const foundKeywords = SUSPICIOUS_KEYWORDS.filter(word => 
            content.toLowerCase().includes(word)
        );
        if (foundKeywords.length > 0) {
            score -= foundKeywords.length * 15;
            explanation.push(`Contains suspicious keywords: ${foundKeywords.join(', ')}`);
        }

        // 2. Check for excessive punctuation
        const exclamationCount = (content.match(/!/g) || []).length;
        if (exclamationCount > 3) {
            score -= 10;
            explanation.push('Contains excessive exclamation marks');
        }

        // 3. Check for excessive uppercase
        const words = content.split(/\s+/);
        const upperCaseWords = words.filter(word => 
            word.length > 3 && word === word.toUpperCase() && !/^\d+$/.test(word)
        );
        if (upperCaseWords.length / words.length > 0.3) {
            score -= 20;
            explanation.push('Contains excessive uppercase words (shouting)');
        }

        // 4. Check for length (too short might be suspicious for news)
        if (content.length < 50) {
            score -= 10;
            explanation.push('Content is too short to be a reliable news source');
        }

        // Determine result based on score
        let result = 'Real';
        if (score < 50) {
            result = 'Fake';
        } else if (score < 80) {
            result = 'Suspicious';
        }

        // Final score normalization
        const confidenceScore = Math.max(0, Math.min(100, score));

        // Save to database
        const news = await News.create({
            userId: req.user.id,
            content,
            inputType: inputType || 'text',
            result,
            confidenceScore,
            explanation
        });

        res.status(201).json({
            success: true,
            data: news
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get user's news history
// @route   GET /api/news/history
exports.getHistory = async (req, res) => {
    try {
        const history = await News.find({ userId: req.user.id }).sort('-createdAt');
        res.status(200).json({
            success: true,
            count: history.length,
            data: history
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get stats for dashboard
// @route   GET /api/news/stats
exports.getStats = async (req, res) => {
    try {
        const stats = await News.aggregate([
            { $match: { userId: req.user._id } },
            { $group: { _id: '$result', count: { $sum: 1 } } }
        ]);
        
        const total = await News.countDocuments({ userId: req.user.id });

        res.status(200).json({
            success: true,
            data: {
                stats,
                total
            }
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
