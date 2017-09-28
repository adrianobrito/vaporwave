import Server from './server';
import minimist from 'minimist';
import JsonFileManager from './database/json-file-manager';

(() => {
	const args       = minimist(process.argv.slice(2));
	const clearCache = args.hasOwnProperty('clear-cache');
	const config     = {
		port    : args.port && parseInt(args.port) || undefined,
		mode    : args.hasOwnProperty('persistent') ? 'persistent' : 'default',
		fixture : args.fixture && loadFixture(args.fixture) || undefined
	};

	if(clearCache) {
		Server.clearCache();
	} else {
		Server.start(config);
	}

	function loadFixture(path) {
		if(!path) {
			throw "You must specify path location when you use --fixture";
		}

		if(path && (path[0] === '/' || path[1] === ':')) {
			return JsonFileManager.load(path);
		} else {
			const relativePath = process.cwd();
			return JsonFileManager.load(`${relativePath}/${path}`);
		}
	}
})();
