const Blog = require('../schemas/blogs');
const template = require('art-template');
const url = require('url');
 
module.exports = (req, res) => {
    if (req.url === '/') {
        // const newUrl = url.parse(req.url, true),
        //     author = newUrl.query.author;
        // let limit = 5,
        //     page,skip,pages;

        // Blog.count().then((count) => {

        //     pages = Math.ceil(count / limit);

        //     page = 1 || 1;

        //     skip = (page - 1) * limit;


        //     console.log(count);
            Blog.find().sort({_id: -1}).then((info) => {
                const data = {list: info};
    
                const html = template(__dirname + "/template/index", data);
    
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                res.write(html);
                res.end();
                return;
            });
        // });

        
    }

    if (/^\/author\//.test(req.url)) {      //查找某位作者的博客文章列表
        const newUrl = url.parse(req.url, true),
            author = newUrl.query.author;
        Blog.find({
            author: author
        }).sort({_id: -1}).then((docs) => {
            const data = {list: docs};

            const html = template(__dirname + "/template/sameOneBlog", data);

            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            res.write(html);
            res.end();
            return;
        });
    }
};