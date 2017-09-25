const JsonFileManager = {

    load(fileName) {
		return new Promise((resolve, reject) => {
			const currentPath = `${__dirname}/${fileName}`;
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

    save(fileName, json) {
        return new Promise((resolve, reject) => {
            const currentPath = `${__dirname}/${fileName}`;
            console.log(`[INFO] Writing file in ${currentPath}`);

            fileSystem.writeFile(`${currentPath}`, json ,(error) => {
				if(error) {
					reject(error);
				} else {
					resolve();
				}
			});
        });
    }

};
