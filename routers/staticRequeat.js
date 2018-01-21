let fs = require('fs');

module.exports = (req, res) => {
    if (/^\/public\//.test(req.url)) {
        if (/\.css$/.test(req.url) ) {      //css请求
            fs.readFile(`./${req.url}`, function(err, data) {
                if (err) {
                    throw err;
                }
                res.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});
                res.write(data);
                res.end();
            });

        } else if (/\.js$/.test(req.url)) {     //js请求
            fs.readFile(`./${req.url}`, function(err, data) {
                if (err) {
                    throw err;
                }
                res.writeHead(200, {'Content-Type': 'text/javascript; charset=utf-8'});
                res.write(data);
                res.end();
            });

        } else if (/\.ico$/.test(req.url)) {    //ico请求
            fs.readFile(`./${req.url}`, function(err, data) {
                if (err) {
                    throw err;
                } else {
                    res.writeHead(200, {'Content-Type': 'image/x-icon'});
                    res.write(data);
                    res.end();
                }
            });
            return;
        } else {    //图片请求
            fs.readFile(`./${req.url}`, 'binary', function(err, data) {
                if (err) {
                    throw err;
                }
                res.writeHead(200, {'Content-type': 'iamge/jpeg'});
                res.write(data, 'binary');
                res.end();
            })
        }
        return;
    }
   
};