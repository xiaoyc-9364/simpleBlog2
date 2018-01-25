const Blog = require('../schemas/blogs');
const url = require('url');
module.exports = (req, res) => {
    if (/^\/addlike\//.test(req.url)) {
        const urlQuery = url.parse(req.url, true).query,
            id = urlQuery.id.replace(/\"/g, '');

    Blog.findOne({_id: id}).then((doc) => {
        doc.like++;
        doc.save();
        return doc;
    }).then((doc) => {
        const data = JSON.stringify(doc);
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(data);
        return doc;
    }).catch((err) => {
        console.log(err);
    })



    }

};