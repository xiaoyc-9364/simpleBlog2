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
    }
    
});
module.exports = mongoose.model('blog', Blog);