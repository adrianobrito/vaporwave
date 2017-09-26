import Server from './server';
import minimist from 'minimist';

(() => {
	const args         = minimist(process.argv.slice(2));
	const port         = args.port && parseInt(args.port) || undefined;
	const isPersistent = args.hasOwnProperty('persistent');

	Server.start(port, isPersistent);
})();
