const mongoose = require('mongoose');


const userSchema  = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false
        },
    bio: {
        type: String,
    },
    profilePic:{
        type: String,
        default: 'https://www.google.com/imgres?q=profile%20image&imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2019%2F08%2F11%2F18%2F59%2Ficon-4399701_640.png&imgrefurl=https%3A%2F%2Fpixabay.com%2Fvectors%2Fsearch%2Fprofile%2520picture%2F&docid=9P_A-b2ziPAARM&tbnid=5tEk3WayougHVM&vet=12ahUKEwiPlKaYkb-LAxUoTWwGHfhrERcQM3oECF8QAA..i&w=640&h=640&hcb=2&ved=2ahUKEwiPlKaYkb-LAxUoTWwGHfhrERcQM3oECF8QAA'
    },
    publicId: {
        type: String,
    },
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    // following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],

    threads: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    replies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    reposts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],



}, {timestamps: true});


const User = mongoose.model('User', userSchema);
module.exports = User;