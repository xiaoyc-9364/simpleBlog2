const Blog = require('../schemas/blogs'),
    querystring = require('querystring'),
    fs = require('fs'),
    template = require('art-template'),
    showIndex = require('./showIndex');
    
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
                year = curTime.getFullYear() + '年',
                month = (curTime.getMonth() + 1) + '月',
                day = curTime.getDate() + '日',
                hours = addZero(curTime.getHours()),
                minutes = addZero(curTime.getMinutes()),
                seconds = addZero(curTime.getSeconds());

            const title = body.title,
                intro =  body.intro,
                content =  body.content,
                author = body.author,
                date = year + month + day + ' ' + hours + ':' + minutes + ':' + seconds;

            if (body.submit === "submit") {
                Blog.findOne({
                    title: title        //查找上传的标题是否存在
                }).then(function(data) {
                    if (data) {         //标题存在则不处理
                        return;
                    }
                    var blog = new Blog({   //储存到数据库
                        title: title,
                        intro: intro,
                        content: content,
                        author: author,
                        date: date
                    });
                    return blog.save();
                }).then(function(newData) {
                    // const html = template(__dirname + "/readBlog", newData);

                    // res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                    // res.write(html);
                    // res.end();
                    showIndex(req, res);    //返回首页
                });
                return;
            }
        });
    }
    
};

