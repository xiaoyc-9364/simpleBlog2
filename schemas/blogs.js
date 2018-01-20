const mongoose = require('mongoose');

const Blog = new mongoose.Schema({
    title: String,
    intro: String,
    content: String,
    author: String,
    date: String
});
module.exports = mongoose.model('blog', Blog);