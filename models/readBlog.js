const Blog = require('../schemas/blogs');
const template = require('art-template');
const url = require('url');
 
module.exports = (req, res) => {
    if (/^\/blogs\//.test(req.url)) {       //查看某篇博客
        const newUrl = url.parse(req.url, true);
        const id = newUrl.query.id.replace(/\"/g, "");

        Blog.findOne({
            _id: id
        }).then(function(info) {
            const html = template(__dirname + "/readBlog", info);

            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            res.write(html);
            res.end();
        }).done(); 
    }
};