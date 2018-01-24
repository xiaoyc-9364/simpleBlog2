const Blog = require('../schemas/blogs'),
    querystring = require('querystring'),
    url = require('url'),
    fs = require('fs'),
    template = require('art-template');

module.exports = (req, res, limit) => {
    const searchData = url.parse(req.url, true).query;
    if (/^\/search\//.test(req.url)) {
        searchRange(req, res, searchData.keyword, searchData.type, limit);
    }
};

function searchRange(req, res, keyword, type, limit) {
    let docsArr = [];                               //存在搜索到的数据  
    const newUrl = url.parse(req.url, true);
    
    Blog.find().sort({_id: -1}).then((docs) => {
        if (keyword !== '') {
            docs.forEach((value, index, arr) => {
                const pattern = new RegExp(keyword, 'gi');      //创建正则
                if (type !== 'all') { 
                    if (pattern.test(value[type])) {
                        docsArr.push(value);
                    }  

                } else if (type === 'all') {
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
        let pages = 1,
            page = Number(newUrl.query.page || 1),
            count = docsArr.length;

            pages = Math.ceil(count / limit);           //计算总页数,向上取整
            page = Math.max(1, Math.min(pages, page));  //当前页的取值范围
        const data = {
            list: docsArr.slice(limit * (page - 1), limit * page),
            page: page,
            count: count,
            limit: limit,
            pages: pages,
            path: newUrl.pathname + "?page=" + page
        };
        const pageData = JSON.stringify(data);

        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.end(pageData);

        return docs;
    });
};