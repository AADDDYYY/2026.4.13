import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/products.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Undo the broken ID assignment
content = content.replace(/id:\s*"seapua-52w10",\n\s*"seapur-50w06-old"/, 'id: "seapua-52w10"');

// Properly add to hiddenProducts array
content = content.replace(/\];\n\nexport const products/, '  , "seapur-50w06-old"\n];\n\nexport const products');

fs.writeFileSync(filePath, content, 'utf-8');
