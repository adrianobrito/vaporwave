import MemoryDatabase from './memory-database';
import DynamicIdGenerator from './dynamic-id-generator';
import JsonFileManager from './json-file-manager';

const persistentFileName = "database.json";

export default class PersistentDatabase extends MemoryDatabase {

	constructor(initialData) {
		if(initialData) {
			super(initialData);
			JsonFileManager.save(persistentFileName, initialData);
		} else {
			super(JsonFileManager.load(persistentFileName));
		}
	}

	post(requestObject) {
		return this._executeAndUpdate(() => super.post(requestObject));
	}

	put(requestObject) {
		return this._executeAndUpdate(() => super.put(requestObject));
	}

	delete(requestObject) {
		return this._executeAndUpdate(() => super.delete(requestObject));
	}

	clear() {
		JsonFileManager.save(persistentFileName, {});
	}

	get fileContent() {
		return JsonFileManager.load(persistentFileName);
	}

	// _ means to be a private method
	_executeAndUpdate(callback) {
		const result = callback();
		JsonFileManager.save(persistentFileName, this.schema);
		return result;
	}

}
