const Blog = require('../schemas/blogs');
const template = require('art-template');
const url = require('url');

module.exports = (req, res) => {
    const newUrl = url.parse(req.url, true);
    
    if (/^\/index/.test(req.url)) {
        showPage(req, res, 5, "/template/index");
    }

    if (/^\/author\//.test(req.url)) {      //查找某位作者的博客文章列表
        author = newUrl.query.author;
        showPage(req, res, 5, "/template/sameOneBlog", {author: author});
    }
};
function showPage(req, res, limit, template_path, opts) {
    const newUrl = url.parse(req.url, true);
    let pages = 1,      //总页数
        page = Number(newUrl.query.page || 1), //当前页
        skip;   //跳过条数

    Blog.find(opts || {}).count().then((count) => {
        pages = Math.ceil(count / limit);           //计算总页数,向上取整
        page = Math.max(1, Math.min(pages, page));  //当前页的取值范围
        skip = (page - 1) * limit;                  //计算需跳过的条数

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