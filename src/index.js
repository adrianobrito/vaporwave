import Server from './server';
import minimist from 'minimist';

(() => {
	const args = minimist(process.argv.slice(2));
	Server.start(args.port && parseInt(args.port) || undefined);
})();
