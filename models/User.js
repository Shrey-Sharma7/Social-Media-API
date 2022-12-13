const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        default:[],
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        default:[],
        ref: 'User'
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
},
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);