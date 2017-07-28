(function (memoryDatabase) {

	var memoryDatabaseObject = {};

	memoryDatabase = {
		'get'    : _get,
		'post'   : _post,
		'put'    : _put,
		'delete' : _delete,
	};
	
	function _get(collectionName, id){
		return memoryDatabaseObject[collectionName] || [];
	}

	function _post(collectionName, object){
		if(object && !object.id) {
			
		}

		if(memoryDatabaseObject[collectionName]) {

		}
	}

	function _put(collectionName, id, object){}

	function _delete(collectionName, id){}

})(module.exports);