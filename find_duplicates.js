import fs from 'fs';

const content = fs.readFileSync('src/data/products.ts', 'utf8');
const idRegex = /id: "([^"]+)"/g;
const ids = [];
let match;

while ((match = idRegex.exec(content)) !== null) {
  ids.push(match[1]);
}

const duplicates = ids.filter((item, index) => ids.indexOf(item) !== index);
console.log('Duplicate IDs:', duplicates);
