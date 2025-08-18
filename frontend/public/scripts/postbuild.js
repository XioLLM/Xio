import { renameSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Xio: running frontend postbuild');
renameSync(
  path.resolve(__dirname, '../dist/index.html'),
  path.resolve(__dirname, '../dist/_index.html')
);
console.log('Xio: index.html renamed to _index.html for SSR');
