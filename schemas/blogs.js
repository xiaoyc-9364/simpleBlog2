const mongoose = require('mongoose');

const Blog = new mongoose.Schema({
    title: String,
    intro: String,
    content: String,
    author: String,
    date: String,
    chatHead: String,
    like: {
        type: Number,
        default: 0
    },
    readNum: {
        type: Number,
        default: 0
    },
    appraise: {
        type: Array,
        default: []
    }
    
});
module.exports = mongoose.model('blog', Blog);