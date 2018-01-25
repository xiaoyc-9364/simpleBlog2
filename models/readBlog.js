const Blog = require('../schemas/blogs');
const template = require('art-template');
const url = require('url');
const throwErr = require('./throwErr');
 
module.exports = (req, res) => {
    if (/^\/blogs\//.test(req.url)) {       //阅读博客
        const newUrl = url.parse(req.url, true);
        const id = newUrl.query.id.replace(/\"/g, "");

        Blog.findOne({
            _id: id
        }).then(function(doc) {
            doc.readNum++;
            doc.save();
            const html = template(__dirname + "/template/readBlog", doc);
            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            res.write(html);
            res.end();
        }).catch((err) => {
            throwErr(req, res);
        }); 
    }
};