var dynamicIdGenerator = require('./dynamic-id-generator.js');

(function (memoryDatabase) {

	var memoryDatabaseObject = {};

	memoryDatabase = {
		'get'    : _get,
		'post'   : _post,
		'put'    : _put,
		'delete' : _delete,
	};
	
	function _get(collectionName, id){
		var targetCollection = memoryDatabaseObject[collectionName] || [];
		if(!id) {
			return targetCollection;
		}

		var desiredObject = targetCollection.filter(byId(id));
		return desiredObject.length && desiredObject[0] || undefined;
	}

	function _post(collectionName, object){
		if(!memoryDatabaseObject[collectionName]) {
			memoryDatabaseObject[collectionName] = [];
		}

		object.id = dynamicIdGenerator.generateId();
		memoryDatabaseObject[collectionName].push(object);
		return object;
	}

	function _put(collectionName, id, object){
		var targetCollection = memoryDatabaseObject[collectionName] || [];
		var targetIndex      = targetCollection.findIndex(byId(id));

		object.id 					  = id;
		targetCollection[targetIndex] = object;
		return object;
	}

	function _delete(collectionName, id){
		var targetCollection = memoryDatabaseObject[collectionName] || [];
		var targetIndex      = targetCollection.findIndex(byId(id));
		var deletedObject    = targetCollection[targetIndex];

		targetCollection.splice(targetIndex, 1);
		return deletedObject;
	}

	function byId(id) {
		return function(objectId) {
			return objectId === id;
		}
	}

})(module.exports);