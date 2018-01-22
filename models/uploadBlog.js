const Blog = require('../schemas/blogs'),
    querystring = require('querystring'),
    fs = require('fs'),
    template = require('art-template'),
    throwErr = require('./throwErr');    
//时分秒为个位数时前面加0
const addZero = (num) => num >= 10 ? num : '0' + num;

module.exports = function(req, res) {
    if(/article/.test(req.url)) {
        let body = '';

        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            body = querystring.parse(body);     //序列化post过来的数据

            const curTime = new Date(),         //当前时间  
                year = curTime.getFullYear() + '-',
                month = (curTime.getMonth() + 1) + '-',
                day = curTime.getDate() + ' ',
                hours = addZero(curTime.getHours()),
                minutes = addZero(curTime.getMinutes()),
                seconds = addZero(curTime.getSeconds());

            const title = body.title,
                intro =  body.intro,
                content =  body.content,
                author = body.author,
                date = year + month + day + hours + ':' + minutes + ':' + seconds;

            if (body.submit === "submit") {
                Blog.create({
                    title: title,
                    intro: intro,
                    content: content,
                    author: author,
                    date: date
                }).then(function(newData) {
                    const html = template(__dirname + "/template/readBlog", newData);
                    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                    res.write(html);
                    res.end();
                    return newData;
                }).catch((err) => {
                    throwErr(req, res);
                });
                return;
            }
        });
    }
    
};

