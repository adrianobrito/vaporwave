#!/usr/bin/env node

// Load the http module to create an http server.
var http           = require('http');
var requestParser  = require('./request-parser.js');
var memoryDatabase = require('./memory-database.js');

var server = http.createServer(function (request, response) {

	var body = "";
	request.on('data', function(data, err) {
		body += data;
	});

	request.on('end', function() {
		request.body     = body;
		var responseBody = prepareResponse(request);
		response.writeHead(200, {"Content-Type": "application/json"});
		response.end(JSON.stringify(responseBody));
	});
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");


function prepareResponse(request) {
	var requestData = requestParser.extractRequestData(request);
	var method      = request.method;
	console.log(requestData);

	return memoryDatabase[method.toLowerCase()](requestData);
}