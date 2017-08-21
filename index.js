#!/usr/bin/env node

// Load the http module to create an http server.
var http           = require('http');
var requestParser  = require('./request-parser.js');
var memoryDatabase = require('./memory-database.js');
var asciiArt       = require('./ascii-art.js');

asciiArt.render();
var server = http.createServer(function (request, response) {
	var body = "";
	request.on('data', function(data, err) {
		body += data;
	});

	request.on('end', function() {
		try {
			request.body     = body;
			var responseBody = prepareResponse(request);
			response.writeHead(200, {"Content-Type": "application/json"});
			response.end(JSON.stringify(responseBody));
		} catch(e) {
			console.error(e);
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.end("Error:" + e);
		}
	});
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Vaporwave is running on port 8000");

function prepareResponse(request) {
	var requestData = requestParser.extractRequestData(request);
	var method      = request.method;

	console.log("[INFO] Extracting request data...");
	console.log(requestData);

	return memoryDatabase[method.toLowerCase()](requestData);
}