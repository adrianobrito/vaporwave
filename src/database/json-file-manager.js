import fileSystem from 'fs';

const JsonFileManager = {
    load(fileName) {
        console.log(`[INFO] Loading data from ${__dirname}/${fileName} file`);
        return JSON.parse(fileSystem.readFileSync(`${__dirname}/${fileName}`));
	},
    save(fileName, json) {
        console.log(`[INFO] Saving data in ${__dirname}/${fileName} file`);
        fileSystem.writeFileSync(`${__dirname}/${fileName}`, JSON.stringify(json));
    }
};

export default JsonFileManager;
