const Blog = require('../schemas/blogs'),
    querystring = require('querystring'),
    url = require('url'),
    fs = require('fs'),
    template = require('art-template');

module.exports = (req, res) => {

    if (/^\/index\/search/.test(req.url)) {
        const searchData = url.parse(req.url, true).query;
        searchRange(req, res, searchData.keyword, searchData.type);
    }
};

function searchRange(req, res, keyword, type) {
    let docsArr = [];       //存在搜索到的数据  
    const newUrl = url.parse(req.url, true);
    
    Blog.find().then((docs) => {
        docs.forEach((value, index, arr) => {
            const pattern = new RegExp(keyword, 'gi');      //创建正则

            if (type !== 'all') {           
                if (pattern.test(value[type])) {
                    docsArr.push(value);
                }  

            } else {
                const typeName = ['title', 'intro', 'content', 'author'];
                for (let i in value) {          //搜索类型为all时，在typeName中的属性搜索
                    if (typeName.indexOf(i) !== -1) {
                        if (pattern.test(value[i])) {
                            docsArr.push(value);
                        }
                    }
                }
                docsArr = Array.from(new Set(...docsArr));  //数组去重
            }
        });

        let limit = 5,
            pages = 1,
            page = Number(newUrl.query.page || 1),
            skip;
        const data = {
            list: docsArr,
            page: page,
            count: docsArr.length,
            limit:limit,
            pages: pages
        };
        const html = template(__dirname + "/template/index", data);
    
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.end(html);

        return docs;
    }).catch((err) => {
        throwErr(req, res);
    });
}

function searchAll(req, res, keyword) {
    let docsArr = [];
    Blog.find().then((docs) => {
        docs.forEach((value, index, arr) => {
            const pattern = new RegExp(keyword, 'gi');
            for (var i in value) {
                if (pattern.test(value[i])) {
                    docsArr.push(value);
                }
            }
        });
        const newUrl = url.parse(req.url, true);
        let limit = 1,
            pages = 1,
            page = Number(newUrl.query.page || 1),
            skip;
        const data = {
            list: docsArr,
            page: page,
            count: docsArr.length,
            limit:limit,
            pages: pages
        };
        const html = template(__dirname + "/template/index", data);
    
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.end(html);

        return docs;
    });
}