const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: [true, 'Please add news content or URL']
    },
    inputType: {
        type: String,
        enum: ['text', 'url'],
        default: 'text'
    },
    result: {
        type: String,
        enum: ['Real', 'Fake', 'Suspicious'],
        required: true
    },
    confidenceScore: {
        type: Number,
        required: true
    },
    explanation: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('News', newsSchema);
