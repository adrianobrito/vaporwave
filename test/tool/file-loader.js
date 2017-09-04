import fileSystem from 'fs';

export const FileLoader = {

	load(path) {
		return new Promise((resolve, reject) => {
			fileSystem.readFile(`${__dirname}/${path}`, (error, data) => {
				if(error) {
					reject(error);
				} else {
					resolve(data);
				}
			});
		});
	}

};