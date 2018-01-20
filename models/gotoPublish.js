const fs = require('fs');

module.exports = (req, res) => {
    if (req.url === '/publish') {   //判断url
        fs.readFile('./views/main/publish.html', function(err,data) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(data);
            res.end();
        });
        return;
    }
};