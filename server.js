var http = require('http');
var dispatcher = require('httpdispatcher');

dispatcher.onGet('/test', function(req, res) {
   res.end('Page One');
});

dispatcher.onPost('/publish', function(req, res) {
    res.end('Body: ' + req.body);
});

var handleRequest = function(request, response) {
    console.log('It Works!! Path Hit: ' + request.url);

    dispatcher.dispatch(request, response);
};

var server = http.createServer(handleRequest);

server.listen(8080, function(){
   console.log('Server started');
});