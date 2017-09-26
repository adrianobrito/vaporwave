import Server from './server';
import minimist from 'minimist';

(() => {
	const args         = minimist(process.argv.slice(2));
	const port         = args.port && parseInt(args.port) || undefined;
	const isPersistent = args.hasOwnProperty('persistent');
	const clearCache   = args.hasOwnProperty('clear-cache');

	if(clearCache) {
		Server.clearCache();
	} else {
		Server.start(port, isPersistent);
	}
})();
