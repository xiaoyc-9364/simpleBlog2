module.exports = (req, res) => {
    if (/\/favicon.ico/g.test(req.url)) {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end();
        return;
    }
};
