import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.resolve(__dirname, '..', 'dist');

const getFolders = () => {
	const folders = [path.resolve(distPath, 'typebox')];

	return folders;
};

(async () => {
	const packageJson = {
		type: 'module',
		main: './index.cjs',
		module: './index.js',
		types: './index.d.ts',
	};

	if (!fs.existsSync(distPath)) {
		throw new Error('folder not exist!');
	}

	const folders = getFolders(distPath);

	folders.forEach((folder) => {
		fs.writeFileSync(
			path.join(folder, 'package.json'),
			JSON.stringify(packageJson, null, 2),
			'utf8',
		);

		console.info(`package.json created on ${folder}`);
	});

	console.info('package.json created on all folders');
})();
