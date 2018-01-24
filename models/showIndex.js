const Blog = require('../schemas/blogs');
const template = require('art-template');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');
const throwErr = require('./throwErr');

module.exports = (req, res, limit) => {
    if (req.url === '/') {
        fs.readFile('./views/main/index.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8;'});
            res.write(data);
            res.end();
        });
    }
    if (/^\/index\//.test(req.url)) {
        const newUrl = url.parse(req.url, true);
        let pages = 1,      //总页数
            page = Number(newUrl.query.page || 1), //当前页
            skip;   //跳过条数

        Blog.find().sort({_id: -1}).then((docs) => {
            const count = docs.length;
            pages = Math.ceil(count / limit);           //计算总页数,向上取整
            page = Math.max(1, Math.min(pages, page));  //当前页的取值范围
            skip = (page - 1) * limit;                  //计算需跳过的条数
            const data = {
                list: docs.slice(limit * (page - 1), limit * page ),
                page: page,
                count: count,
                limit: limit,
                pages: pages,
                path: newUrl.pathname + "?page=" + page
            };
            const newData = JSON.stringify(data);
            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            res.end(newData);
        }).catch((err) => {
            throwErr(req, res);
        });
    }

    if (/^\/author\//.test(req.url)) {
        const newUrl = url.parse(req.url, true), 
            author = newUrl.query.author;
        let pages = 1,      //总页数
            page = Number(newUrl.query.page || 1), //当前页
            skip;   //跳过条数

        Blog.find({author: author}).sort({_id: -1}).then((docs) => {
            const count = docs.length;
            pages = Math.ceil(count / limit);           //计算总页数,向上取整
            page = Math.max(1, Math.min(pages, page));  //当前页的取值范围
            skip = (page - 1) * limit;                  //计算需跳过的条数

            const data = {
                list: docs.slice(limit * (page - 1), limit * page ),
                page: page,
                count: count,
                limit: limit,
                pages: pages,
                path: newUrl.pathname + "?page=" + page
            };
            const newData = JSON.stringify(data);
            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            res.end(newData);
        }).catch((err) => {
            throwErr(req, res);
        });
    }
    
    
};

function returnDate(req, res, limit, template_path, opts) {
    
};