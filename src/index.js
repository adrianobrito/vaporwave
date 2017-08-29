import Http from 'http';

const vaporwaveServer = Http.createServer( (request, response) => {
	console.log("Server is up and running...");
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(JSON.stringify(responseBody));
});

vaporwaveServer.listen(8888);


