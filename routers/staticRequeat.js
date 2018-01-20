let fs = require('fs');

module.exports = {
    getCss(req, res) {
        if (/\.css$/.test(req.url) ) {      //css请求
            fs.readFile(`./${req.url}`, function(err, data) {
                if (err) {
                    throw err;
                }
                res.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});
                res.write(data);
                res.end();
            });
            return;
        } 
    },

    getJavascript(req, res) {               //接收请求
        if (/\.js$/.test(req.url) ) {
            fs.readFile(`./${req.url}`, function(err, data) {
                if (err) {
                    throw err;
                }
                res.writeHead(200, {'Content-Type': 'text/javascript; charset=utf-8'});
                res.write(data);
                res.end();
            });
            return;
        }
    },
};