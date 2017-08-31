import Database from './database'

class MemoryDatabase extends Database {

	constructor(initialData = {}) {
		this.memoryDatabaseObject = initialData; 
	}

	get(requestObject) {
		console.log("[GET] Getting a resource in memory database");
		let endpoint         = requestObject.endpoint;
		let targetCollection = memoryDatabaseObject[endpoint.entity] || [];
		if(!endpoint.id) {
			return targetCollection;
		}

		let targetObject = targetCollection.filter(byId(endpoint.id));
		return targetObject.length && targetObject[0] || undefined;
	}

	post() {
		throw new Error('You have to implement the method post()');
	}

	put() {
		throw new Error('You have to implement the method put()');
	}

	delete() {
		throw new Error('You have to implement the method delete()');
	}

}