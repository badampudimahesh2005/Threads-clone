const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({

    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text : {
        type: String,
    },
    media: {
        type: String,
    },
    publicId: {
        type: String,
    },
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    


}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;