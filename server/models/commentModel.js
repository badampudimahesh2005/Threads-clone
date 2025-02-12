
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    text: {
        type: String,
        required: true,
    },

}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;