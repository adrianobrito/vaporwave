import MemoryDatabase from './memory-database';
import DynamicIdGenerator from './dynamic-id-generator';
import JsonFileManager from './json-file-manager';

const persistentFileName = "database.json";

export default class PersistentDatabase extends MemoryDatabase {

	constructor(initialData = {}) {
		super(initialData);
	}

	post(requestObject) {
		this._executeAndUpdate(super.post.bind(this, requestObject));
	}

	put(requestObject) {
		this._executeAndUpdate(super.put.bind(this, requestObject));
	}

	delete(requestObject) {
		this._executeAndUpdate(super.delete.bind(this, requestObject));
	}

	get fileContent() {
		return JsonFileManager.load(persistentFileName);
	}

	// _ means to be a private method
	_executeAndUpdate(callback) {
		callback();
		JsonFileManager.save(persistentFileName, this.schema);
	}

}
