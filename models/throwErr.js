const fs = require('fs');

module.exports = throwErr = (req, res) => {
    fs.readFile('./views/main/error.html', function(err, data) {
        if (err) {
            throwErr(req, res);
        }
        res.writeHead(200, {'Content-Type': 'text/html; chatset=utf-8'});
        res.write(data);
        res.end();
    });
    return;
};