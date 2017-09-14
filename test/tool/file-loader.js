import fileSystem from 'fs';

const FileLoader = {

	load(path) {
		return new Promise((resolve, reject) => {
			const currentPath = `${__dirname}/${path}`;
			console.log(`[INFO] Reading file from ${currentPath}`);

			fileSystem.readFile(`${currentPath}`, (error, data) => {
				if(error) {
					reject(error);
				} else {
					resolve(data);
				}
			});
		});
	}

};

export default FileLoader;