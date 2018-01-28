const fs = require('fs');

module.exports = throwErr = (req, res) => {
    fs.readFile('./views/main/error.html', function(err, data) {
        if (err) {
            console.log(err);
            throwErr(req, res);
        }
        res.writeHead(200, {'Content-Type': 'text/html; chatset=utf-8'});
        res.end(data);
    });
    return;
};