const Blog = require('../schemas/blogs');
const url = require('url');
module.exports = (req, res) => {
    if (/^\/addlike\//.test(req.url)) {
        const urlQuery = url.parse(req.url, true).query,
            id = urlQuery.id.replace(/\"/g, '');

    Blog.findOne({_id: id}).then((doc) => {
        const likeNum = doc.like;
        console.log(likeNum);
        Blog.findOneAndUpdate({_id: id}, {like: likeNum++}).then((doc) => {
            consoel.log(doc);
        });
    })



    }

};