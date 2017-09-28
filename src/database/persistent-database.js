import MemoryDatabase from './memory-database';
import DynamicIdGenerator from './dynamic-id-generator';
import JsonFileManager from './json-file-manager';

const persistentPathName = `${__dirname}/database.json`;

export default class PersistentDatabase extends MemoryDatabase {

	constructor(initialData) {
		if(initialData) {
			super(initialData);
			JsonFileManager.save(persistentPathName, initialData);
		} else {
			super(JsonFileManager.load(persistentPathName));
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
		JsonFileManager.save(persistentPathName, {});
	}

	get fileContent() {
		return JsonFileManager.load(persistentPathName);
	}

	// _ means to be a private method
	_executeAndUpdate(callback) {
		const result = callback();
		JsonFileManager.save(persistentPathName, this.schema);
		return result;
	}

}
