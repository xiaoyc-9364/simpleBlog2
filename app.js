const mongoose = require('mongoose'),
    http = require('http'),
    querystring = require('querystring'),
    fs = require('fs');

//自定义模块
const blogData = require('./models/Blog'),
    showIndex = require('./models/showIndex'),
    readBlog = require('./models/readBlog'),
    gotoPublish = require('./models/gotoPublish'),
    favicon = require('./models/favicon'),
    throwErr = require('./models/throwErr');
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
    try {
        if(req.method.toUpperCase() === 'POST') {
            blogData(req, res);

            // let body = '';

            // req.on('data', (data) => {
            //     body += data;
            // });
            // req.on('end', () => {
            //     console.log(body);
            // });
            // // body = querystring.parse(body)
            // console.log(body);
            // fs.readFile('./views/main/publish.html', function(err, data) {
            //     res.writeHead(200, {'Content-Type': 'application/json'});
            //     res.write(body);
            //     res.end();
            // });
            // res.writeHead(200, {"Content-Type": "application/json"});  
            // var otherArray = ["item1", "item2"];  
            // var otherObject = { item1: "item1val", item2: "item2val" };  
            // var json = JSON.stringify({   
            //     anObject: otherObject,   
            //     anArray: otherArray,   
            // });  
            // res.write(json);
            // res.end();  //！！一定要加配置的回调方法名  


        } else {
            staticRequeat(req, res);     //css请求
            readBlog(req, res);     //阅读博客文章请求
            showIndex(req, res);    //首页请求
            gotoPublish(req, res);  //发布博客页面请求
        }
    } catch (error) {
        throwErr(req, res);
    }
});
server.listen(8088, 'localhost');
