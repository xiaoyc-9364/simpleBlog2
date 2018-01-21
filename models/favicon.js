const fs = require('fs');
module.exports = (req, res) => {
    if (/\/favicon.ico/g.test(req.url)) {
        fs.readFile('./public/images/bitbug_favicon.ico', function(err, data) {
            if (err) {
                throw err;
            } else {
                res.writeHead(200, {'Content-Type': 'image/x-icon'});
                res.write(data);
                res.end();
            }
        });
        return;
    }
};
