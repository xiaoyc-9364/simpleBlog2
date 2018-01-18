var mongoose = require('mongoose');
var http = require('http');
var querystring = require('querystring');
var fs = require('fs');

mongoose.connect('mongodb://localhost:27019/blog', {useMongoClient: true}, function(err) {
    if (err) {
        console.log('数据库连接失败!');
    } else {
        console.log('数据库连接成!');
    }
});

function getCss(req, res) {
    if (/^(\/public\/)\w+(\.css)$/.test(req.url) ) {
        fs.readFile(`.${req.url}`, function(err, data) {
                res.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});
                res.write(data);
                res.end();
            });
            // return;
    }
}



var server = http.createServer(function(req, res) {
    if(req.method === 'POST') {
        let body = '';
        req.on('data', (data) => {
            console.info(data);
            body += data;
        });
    
        req.on('end', (data) => {
            body = querystring.parse(body);
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(`<h1>添加文章${body.title}成功!</h1>`);
            res.end();
        });

        return;
    } else {
        // if (/\.css$/.test(req.url)) {
        //     fs.readFile(`./${req.url}`, function(err,data) {
        //         res.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});
        //         res.write(data);
        //         res.end();
        //     });
        //     return;
        // }
        // getCss(req, res);
        if (/^\/public\/\w+\.css$/.test(req.url) ) {
            fs.readFile(`./${req.url}`, function(err, data) {
                    res.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});
                    res.write(data);
                    res.end();
                });
                return;
        }
        switch(req.url) {
            case '/': 
                fs.readFile('./views/main/index.html', function(err,data) {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write(data);
                    res.end();
                });
            break;
            
            case '/about': 
                fs.readFile('./views/main/about.html', function(err,data) {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write(data);
                    res.end();
                });
            break;
    
            case '/favicon.ico': 
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write('xx');
                res.end();
            break;
    
            default:
                res.end();
                
        }
    }
});
server.listen(8088, 'localhost');
console.log(new Date);