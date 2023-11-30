const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema ({
    commentWriterPhoto: {
        type: String,
        required: true
    },
    commentWriterName: {
        type: String,
        required: true
    },
    commentReceiverID: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const comments = mongoose.model('comments', commentsSchema);

module.exports = comments;