import http               from 'http';
import requestParser      from './request/request-parser';
import MemoryDatabase     from './database/memory-database';
import PersistentDatabase from './database/persistent-database';
import asciiArt           from './ascii/ascii-art';

const Server = (() => {

	let database;

	return {
		start       : start,
		setDatabase : setDatabase,
		clearCache  : clearCache
	}

	function setDatabase(database) {
		database = database;
	}

	function start(port = 8000, persistent = false) {
		asciiArt.render();

		if(persistent) {
			console.log("[INFO] Vaporwave initialized in persistent mode");
			database = new PersistentDatabase();
		} else {
			database = new MemoryDatabase();
		}

		const httpServer = http.createServer(handleRequest);
		httpServer.listen(port);

		console.log(`Vaporwave is running on port ${port}`);
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
		console.log(database);
		console.log(requestData);

		return database[method.toLowerCase()](requestData);
	}

	function clearCache() {
		console.log("[INFO] Clearing persistent cache...");
		database = new PersistentDatabase();
		database.clear();
		console.log("[INFO] Persistent cache cleared");
	}

})();

export default Server;
