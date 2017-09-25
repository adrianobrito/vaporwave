import MemoryDatabase from './database.js';
import DynamicIdGenerator from './dynamic-id-generator.js';

export default class PersistentDatabase extends Database {

	constructor(initialData = {}) {
		super();
		this.memoryDatabaseObject = initialData;
	}

	get(requestObject) {}

	post(requestObject) {}

	put(requestObject) { }

	delete(requestObject) { }

    function updateState() {
        
    }

}
