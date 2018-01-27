const Blog = require('../schemas/blogs');
const url = require('url');
const throwErr = require('./throwErr');
module.exports = (req, res) => {
    if (/^\/addlike\//.test(req.url)) {
        const urlQuery = url.parse(req.url, true).query,
            id = urlQuery.id.replace(/\"/g, '');

    Blog.findOne({_id: id}).then((doc) => {     //查找增加点赞量的数据
        doc.like++;
        doc.save();
        return doc;
    }).then((doc) => {
        const data = JSON.stringify(doc);
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(data);
        return doc;
    }).catch((err) => {
        throwErr(req, res);
    });
    }
};