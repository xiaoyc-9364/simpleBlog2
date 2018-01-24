const Blog = require('../schemas/blogs'),
    querystring = require('querystring'),
    fs = require('fs'),
    template = require('art-template'),
    throwErr = require('./throwErr');

//时分秒为个位数时前面加0
const addZero = (num) => num >= 10 ? num : '0' + num;
const random = (n, m) => Math.floor(Math.random() * (m - n + 1) + n);   //随机数

const chatHeadSrc = ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.png', '6.jpeg', 
    '7.jpeg', '8.jpeg', '9.jpeg', '10.jpeg', '11.jpeg', '12.jpeg'];

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
               
            const i =  random(0, chatHeadSrc.length - 1);   

            let title = body.title,
                intro =  body.intro,
                content =  body.content,
                author = body.author,
                date = year + month + day + hours + ':' + minutes + ':' + seconds,
                chatHead = '/public/images/' + chatHeadSrc[i];

            if (body.submit === "submit") {
                Blog.find({
                    author: author
                }).then((docs) => {
                    if (docs.length > 0) {      //判断数据库中是否有该作者，有则获取他的头像
                        chatHead = docs[0].chatHead;
                    }
                    var blog = new Blog({   //储存到数据库
                            title: title,
                            intro: intro,
                            content: content,
                            author: author,
                            date: date,
                            chatHead: chatHead
                        });
                        return blog.save();
                }).then(function(newData) {
                    const data = JSON.stringify(newData);
                    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                    res.write(data);
                    res.end();
                    return newData;
                }).catch((err) => {
                    console.log(err);
                    throwErr(req, res);
                });
                return;
            }
        });
    }
    
};

