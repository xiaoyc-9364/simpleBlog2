var optfile = require('./optfile');
var fs = require('fs');
function getRecall(req, res) {
    res.writeHead(200, {'Content-Type': 'test/html; charset=utf-8'});
    function recall(data) {
        res.write(data);
        res.end();
    }
    return recall;
}


module.exports = {
    login: function(req, res) {
        fs.readFile('./views/login.html', function(err,data) {
            res.writeHead(200, {'Content-Type': 'test/html; charset=utf-8'});
            res.write(data);
            res.end();
        });
    },
    zhuce: function(req, res) {
        recall = getRecall(req, res);
        optfile.readfile('./views/zhuce.html', recall);
    },
    writefile: function(req, res, data) {
            res.write(data);
            res.end();
    },
    showImg: function(req, res) {
        fs.readFile('./views/rhino.jpg', function(err, data) {
            if (err) {
                throw err;
            } else {
                res.writeHead(200, {'Content-Type': 'test/html; charset=utf-8'});
                
                res.write(data);
                res.end(); 
            }
           
        })
    }
};