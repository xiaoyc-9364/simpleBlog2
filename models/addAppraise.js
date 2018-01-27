const querystring = require('querystring'),
    Blog = require('../schemas/blogs'),
    throwErr = require('./throwErr'),
    getCuttentTime = require('./function/getCurrentTime');
module.exports = (req, res) => {
    if (/^\/addappraise\//.test(req.url)) {
        let body = '';

        req.on('data', (data) => {
            body += data;
        });

        req.on('end', () => {
            body = querystring.parse(body);     //序列化post过来的数据

            const appraise = body.appraise,
                id = body.id.replace(/\"/g, '');
            
            Blog.findOne({_id: id}).then((doc) => {     //查找增加评论的数据
                const appraiseInfo = {
                    date: getCuttentTime(),         
                    text: appraise
                };
                doc.appraise.unshift(appraiseInfo);     //放到数据库的前端
                return doc.save();
            }).then((doc) => {
                const data = JSON.stringify(doc.appraise[0]);       //返回给前端的数据
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                res.end(data);
                return doc;
            }).catch((err) => {
                throwErr(req, res);
            })
        });
    }
};