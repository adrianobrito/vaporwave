import Database from './database';
import DynamicIdGenerator from './dynamic-id-generator';

export default class MemoryDatabase extends Database {

	constructor(initialData = {}) {
		super();
		this.memoryDatabaseObject = initialData;
	}

	get(requestObject) {
		console.log("[GET] Getting a resource in memory database");
		let endpoint         = requestObject.endpoint;
		let targetCollection = this.memoryDatabaseObject[endpoint.entity] || [];
		if(!endpoint.param) {
			return targetCollection;
		}

		let targetObject = targetCollection.filter(this.byParam(endpoint.param,endpoint.value));
		if ( endpoint.multi )
			return targetObject.length && targetObject || undefined;
		else
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
		const targetIndex      = targetCollection.findIndex(this.byParam(endpoint.param,endpoint.value));

		body[endpoint.param] 		  = endpoint['value'];

		targetCollection[targetIndex] = body;
		return body;
	}

	delete(requestObject) {
		console.log("[DELETE] Removing a resource in memory database");
		var endpoint         = requestObject.endpoint;
		var targetCollection = this.memoryDatabaseObject[endpoint.entity] || [];
		var targetIndex      = targetCollection.findIndex(this.byParam(endpoint.param,endpoint.value));
		var deletedObject    = targetCollection[targetIndex];

		targetCollection.splice(targetIndex, 1);
		return deletedObject;
	}

	get schema() {
		return this.memoryDatabaseObject;
	}

	byParam(param, value){
		return function(object){
			return object[param] == value;
		}
	}

}
