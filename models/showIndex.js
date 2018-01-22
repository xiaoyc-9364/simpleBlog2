const Blog = require('../schemas/blogs');
const template = require('art-template');
const url = require('url');
function showPage(req, res, limit, template_path, opts) {
    const newUrl = url.parse(req.url, true);
    let pages = 1,
        page = Number(newUrl.query.page || 1),
        skip;

    Blog.find(opts || {}).count().then((count) => {
        pages = Math.ceil(count / limit);
        page = Math.max(1, Math.min(pages, page));
        skip = (page - 1) * limit;

        Blog.find(opts || {}).sort({_id: -1}).limit(limit).skip(skip).then((docs) => {
            const data = {
                list: docs,
                page: page,
                count: count,
                limit: limit,
                pages: pages
            };
            const html = template(__dirname + template_path, data);

            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            res.end(html);
            return;
        });
    });
};
module.exports = (req, res) => {
    if (/^\/index/.test(req.url)) {
        const newUrl = url.parse(req.url, true);
        showPage(req, res, 5, "/template/index");
    }

    if (/^\/author\//.test(req.url)) {      //查找某位作者的博客文章列表
        const newUrl = url.parse(req.url, true);
            author = newUrl.query.author;
        showPage(req, res, 5, "/template/sameOneBlog", {author: author});
    }
};
