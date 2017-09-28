import fileSystem from 'fs';

const JsonFileManager = {
    load(path) {
        console.log(`[INFO] Loading data from ${path} file`);
        return JSON.parse(fileSystem.readFileSync(`${path}`));
	},
    save(path, json) {
        console.log(`[INFO] Saving data in ${path} file`);
        fileSystem.writeFileSync(`${path}`, JSON.stringify(json));
    }
};

export default JsonFileManager;
