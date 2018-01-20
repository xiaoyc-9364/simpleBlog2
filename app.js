const mongoose = require('mongoose'),
    http = require('http'),
    querystring = require('querystring'),
    fs = require('fs'),

//自定义模块
const blogData = require('./models/Blog'),
    showIndex = require('./models/showIndex'),
    readBlog = require('./models/readBlog'),
    gotoPublish = require('./models/gotoPublish'),
    favicon = require('./models/favicon'),
    staticRequeat = require('./routers/staticRequeat'); //静态请求

//连接数据库
mongoose.connect('mongodb://localhost:27019/blog', {useMongoClient: true}, function(err) {
    if (err) {
        console.log('数据库连接失败!');
    } else {
        console.log(new Date().getHours()+'点' + new Date().getMinutes() + '分,数据库连接成!');
    }
});
//创建服务器
const server = http.createServer(function(req, res) {
    if(req.method === 'POST') {
        blogData(req, res);
    } else {
        staticRequeat.getCss(req, res);     //css请求
        staticRequeat.getJavascript(req, res);      //js请求
        readBlog(req, res);     //阅读博客文章请求
        showIndex(req, res);    //首页请求
        gotoPublish(req, res);  //发布博客页面请求
        favicon(req, res);      //图标请求
    }
});
server.listen(8088, 'localhost');