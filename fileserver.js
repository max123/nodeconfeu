new Error().stack;
var restify = require('restify');
var fs = require('fs');


var server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get(/^\/(.*)/, function dowork (req, res, next) {

    fs.readFile(req.params[0], 'utf8', function myread(e, data) {
	var payload;

	if (e) {
            if (e.code == 'ENOENT') {
		console.error(new Error('File: ' + req.params[0] + ' does not exist.'));
	    } else {
		console.error(new Error('Error reading: ' + req.params[0] + ' ' + JSON.stringify(e)));
	    }
	    payload = e.toString();
	    res.send(payload);
	} else {
	    payload = data.toString();
	    res.send(payload);
	}
    });

    return next();
});

server.listen(3000, function () {
    console.log('%s listening at %s', server.name, server.url);
});
