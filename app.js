const mongoose = require('mongoose'),
    http = require('http'),
    querystring = require('querystring'),
    fs = require('fs');
const limit = 3;
//自定义模块
const uploadBlog = require('./models/uploadBlog'),
    showIndex = require('./models/showIndex'),
    readBlog = require('./models/readBlog'),
    gotoPublish = require('./models/gotoPublish'),
    favicon = require('./models/favicon'),
    throwErr = require('./models/throwErr'),
    searchBlog = require('./models/searchBlog'),
    clickLike = require('./models/clickLike');
    staticRequeat = require('./models/staticRequeat'); //静态请求


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
    try {
        if(req.method.toUpperCase() === 'POST') {
            uploadBlog(req, res);
        } else {
            staticRequeat(req, res);     //css请求
            readBlog(req, res);     //阅读博客文章请求
            showIndex(req, res, limit);    //首页请求
            gotoPublish(req, res);  //发布博客页面请求
            searchBlog(req, res, limit);   //搜索功能
            clickLike(req, res);
        }
    } catch (error) {
        if (error) {
            console.log(error);
        }
        throwErr(req, res);
    }
});
server.listen(8088, 'localhost');
