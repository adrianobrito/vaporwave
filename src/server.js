import http           from 'http';
import requestParser  from './request/request-parser.js';
import MemoryDatabase from './database/memory-database.js';
import asciiArt       from './ascii/ascii-art.js';

const Server = (() => {

	let memoryDatabase = new MemoryDatabase();

	return {
		start       : start,
		setDatabase : setDatabase
	}

	function setDatabase(database) {
		memoryDatabase = database;
	}

	function start() {
		asciiArt.render();
		const httpServer = http.createServer(handleRequest);

		// Listen on port 8000, IP defaults to 127.0.0.1
		httpServer.listen(8000);

		// Put a friendly message on the terminal
		console.log("Vaporwave is running on port 8000");
	}

	function handleRequest(request, response) {
		let body = "";
		request.on('data', (data, err) => {
			body += data;
		});

		request.on('end', () => {
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
	}

	function prepareResponse(request) {
		var requestData = requestParser.extractRequestData(request);
		var method      = request.method;

		console.log("[INFO] Extracting request data...");
		console.log(requestData);

		return memoryDatabase[method.toLowerCase()](requestData);
	}

})();

export default Server;