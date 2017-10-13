import http               from 'http';
import requestParser      from './request/request-parser';
import MemoryDatabase     from './database/memory-database';
import PersistentDatabase from './database/persistent-database';
import QueryExecutor      from './database/query-executor';
import asciiArt           from './ascii/ascii-art';
import querystring        from 'querystring';

const Server = (() => {
	const defaultConfig = {port: 8000, mode: 'default'};
	let database;
	let httpServer;

	return {
		start,
		setDatabase,
		stop,
		clearCache
	}

	function setDatabase(newDatabase) {
		database = newDatabase;
	}

	function start(config) {
		config = {...defaultConfig, ...config};
		asciiArt.render();

		const isPersistent = config.mode === 'persistent';
		const jsonFixture  = config.fixture || undefined;
		startupDatabase(isPersistent, jsonFixture);
		startupServer(config.port);

		console.log(`Vaporwave is running on port ${config.port}`);
	}

	function stop() {
		httpServer.close();
	}

	function startupDatabase(isPersistent, jsonFixture) {
		if(isPersistent) {
			console.log("[INFO] Vaporwave initialized in persistent mode");
			database = new PersistentDatabase(jsonFixture);
		} else {
			database = new MemoryDatabase(jsonFixture);
		}
	}

	function startupServer(port) {
		httpServer = http.createServer(handleRequest);
		httpServer.listen(port);
	}

	function handleRequest(request, response) {
		let body = "";
		request.on('data', (data, err) => {
			body += data;
		});

		request.on('end', () => {
			try {
				request.body       = body;
				const responseBody = prepareResponse(request);
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
		const requestData = requestParser.extractRequestData(request);
		const method      = request.method;

		console.log("[INFO] Extracting request data...");
		console.log(requestData);

		const response = database[method.toLowerCase()](requestData);
		return requestData.query ?
			QueryExecutor.executeQueryIn(response, requestData.query) :
			response;
	}

	function clearCache() {
		console.log("[INFO] Clearing persistent cache...");
		database = new PersistentDatabase();
		database.clear();
		console.log("[INFO] Persistent cache cleared");
	}

})();

export default Server;
