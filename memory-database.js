var dynamicIdGenerator = require('./dynamic-id-generator.js');

(function (memoryDatabase) {

	var memoryDatabaseObject = {};

	memoryDatabase.get    = _get;
	memoryDatabase.post   = _post;
	memoryDatabase.put    = _put;
	memoryDatabase.delete = _delete;
	
	function _get(requestObject){
		var endpoint = requestObject.endpoint;
		var targetCollection = memoryDatabaseObject[endpoint.entity] || [];
		if(!endpoint.id) {
			return targetCollection;
		}

		var targetObject = targetCollection.filter(byId(endpoint.id));
		return targetObject.length && targetObject[0] || undefined;
	}

	function _post(requestObject){
		var endpoint = requestObject.endpoint;
		var body     = requestObject.body;
		if(!memoryDatabaseObject[endpoint.entity]) {
			memoryDatabaseObject[endpoint.entity] = [];
		}

		body.id = dynamicIdGenerator.generateId();
		memoryDatabaseObject[endpoint.entity].push(body);
		return body;
	}

	function _put(requestObject){
		var body             = requestObject.body;
		var endpoint         = requestObject.endpoint;
		var targetCollection = memoryDatabaseObject[endpoint.entity] || [];
		var targetIndex      = targetCollection.findIndex(byId(endpoint.id));

		body.id 					  = endpoint.id;
		targetCollection[targetIndex] = body;
		return body;
	}

	function _delete(requestObject){
		var endpoint         = requestObject.endpoint;
		var targetCollection = memoryDatabaseObject[endpoint.entity] || [];
		var targetIndex      = targetCollection.findIndex(byId(endpoint.id));
		var deletedObject    = targetCollection[targetIndex];

		targetCollection.splice(targetIndex, 1);
		return deletedObject;
	}

	function byId(id) {
		return function(object) {
			return object.id === id;
		}
	}

})(module.exports);