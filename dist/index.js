"use strict";

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vaporwaveServer = _http2.default.createServer(function (request, response) {
	console.log("Server is up and running...");
	response.writeHead(200, { "Content-Type": "application/json" });
	response.end(JSON.stringify(responseBody));
});

vaporwaveServer.listen(8888);