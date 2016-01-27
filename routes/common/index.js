/**
 * Dependencies.
 */
var http             = require('http');
var fs               = require('fs');

module.exports = function(app, config, passport) {

    // INIT ================================
    app.get(config.public.url.admin, function(req, res) { // '/'
        console.log(req.user);

        res.render('index', {
            title: 'Postit admin',
            env: config.env,
            domain: config.domain.url,
            session: req.user
        });
    });

    // GETFILE ==============================
    app.post('/getFile', function(req, res) {
        // console.log(req);
        var file = 'public/test.txt';
        fs.writeFile(file, req.body.msg, function(err) {
            if(err) {
                return console.log(err);
            }
            else {
                console.log("The file was saved!");
                res.send(200);
            }
        });
    });

    // var file = fs.createWriteStream("test.txt");
    // app.get("test.txt", function(response) {
    //     // console.log('file', file);
    //     response.pipe(file);
    // });
};