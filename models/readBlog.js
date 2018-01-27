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
            const html = template(__dirname + "/template/readBlog", doc);
            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            res.write(html);
            res.end();
            return doc;
        }).then((doc) => {
            doc.readNum++;          //增加阅读量
            return doc.save();
        }).catch((err) => {
            throwErr(req, res);
        }); 
        return;
    }
};