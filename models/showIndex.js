const Blog = require('../schemas/blogs');
const url = require('url');
const fs = require('fs');
const throwErr = require('./throwErr');

module.exports = (req, res, limit) => {
    if (req.url === '/') {
        // 重定向  /blog-list/?page=1
        res.writeHead(302, {
            'Location': '/blog-list/'
        });
        res.end();
    }
    
    if (/^\/blog-list\//.test(req.url)) {
        fs.readFile('./views/main/index.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8;'});
            res.write(data);
            res.end();
        });
    }

    if (/^\/author\//.test(req.url)) {
        fs.readFile('./views/main/index.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8;'});
            res.write(data);
            res.end();
        });
    }

    if (/^\/blog-list-ajax\//.test(req.url)) {          //相应博客首页ajax请求
        searchRange(req, res, limit);
    }

    if (/^\/author-list-ajax\//.test(req.url)) {
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
                path: '/author/?page='
            };
            const newData = JSON.stringify(data);
            res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
            res.end(newData);
        }).catch((err) => {
            throwErr(req, res);
        });
    }
    
    
};

function searchRange(req, res, limit) {
    let docsArr = [],                               //存在搜索到的数据  
        query = url.parse(req.url, true).query,
        keyword = query.keyword,
        type = query.type,
        page = Number(query.page);
    
    Blog.find().sort({_id: -1}).then((docs) => {
        if (keyword) {
            docs.forEach((value, index, arr) => {
                const pattern = new RegExp(keyword, 'gi');      //创建正则
                if (type !== 'all') { 
                    if (pattern.test(value[type])) {
                        docsArr.push(value);
                    }  

                } else {
                    const typeName = ['title', 'intro', 'content', 'author'];
                    typeName.some(type => {
                        const hasKeyword = pattern.test(value[type]);
                        if (hasKeyword) {
                            docsArr.push(value);
                        }
                        return hasKeyword;
                    });
                }
            });

        } else {
            docsArr = docs;
        }

        let count = docsArr.length,
            pages = Math.ceil(count / limit);          //计算总页数,向上取整
           
        page = Math.max(1, Math.min(pages, page));  //当前页的取值范围

        const data = {
            list: docsArr.slice(limit * (page - 1), limit * page),
            page: page,
            count: count,
            limit: limit,
            pages: pages,
            path: '/blog-list/?page=' 
        };

        const pageData = JSON.stringify(data);

        res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
        res.end(pageData);

        return docs;
    });
};