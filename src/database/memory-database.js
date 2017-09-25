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
		const endpoint = requestObject.endpoint;
		const body     = requestObject.body;
		if(!this.memoryDatabaseObject[endpoint.entity]) {
			this.memoryDatabaseObject[endpoint.entity] = [];
		}

		body.id = DynamicIdGenerator.generateId();
		this.memoryDatabaseObject[endpoint.entity].push(body);
		return body;
	}

	put(requestObject) {
		console.log("[PUT] Updating a resource in memory database");
		const body             = requestObject.body;
		const endpoint         = requestObject.endpoint;
		const targetCollection = this.memoryDatabaseObject[endpoint.entity] || [];
		const targetIndex      = targetCollection.findIndex(this.byId(endpoint.id));

		body.id 					  = endpoint.id;
		targetCollection[targetIndex] = body;
		return body;
	}

	delete(requestObject) {
		console.log("[DELETE] Removing a resource in memory database");
		var endpoint         = requestObject.endpoint;
		var targetCollection = this.memoryDatabaseObject[endpoint.entity] || [];
		var targetIndex      = targetCollection.findIndex(this.byId(endpoint.id));
		var deletedObject    = targetCollection[targetIndex];

		targetCollection.splice(targetIndex, 1);
		return deletedObject;
	}

	get schema() {
		return this.memoryDatabaseObject;
	}

	byId(id) {
		return function(object) {
			return object.id === id;
		}
	}

}
