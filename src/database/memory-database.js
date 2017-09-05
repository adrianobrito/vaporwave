import Database from './database.js';
import DynamicIdGenerator from './dynamic-id-generator.js';

export default class MemoryDatabase extends Database {

	constructor(initialData = {}) {
		super();
		this.memoryDatabaseObject = initialData; 
	}

	get(requestObject) {
		console.log("[GET] Getting a resource in memory database");
		let endpoint         = requestObject.endpoint;
		let targetCollection = this.memoryDatabaseObject[endpoint.entity] || [];
		if(!endpoint.id) {
			return targetCollection;
		}

		let targetObject = targetCollection.filter(this.byId(endpoint.id));
		return targetObject.length && targetObject[0] || undefined;
	}

	post(requestObject) {
		console.log("[POST] Inserting a resource in memory database");
		var endpoint = requestObject.endpoint;
		var body     = requestObject.body;
		if(!this.memoryDatabaseObject[endpoint.entity]) {
			this.memoryDatabaseObject[endpoint.entity] = [];
		}

		body.id = DynamicIdGenerator.generateId();
		this.memoryDatabaseObject[endpoint.entity].push(body);
		return body;
	}

	put() {
		throw new Error('You have to implement the method put()');
	}

	delete() {
		throw new Error('You have to implement the method delete()');
	}

	byId(id) {
		return function(object) {
			return object.id === id;
		}
	}

}