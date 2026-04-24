import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/products.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Undo the regex replace by removing /* { id: "seapur-...(matching the first }) */
content = content.replace(/\/\* (\{[\s\S]*?\}(\s*,)?) \*\/\n  /g, '$1');

// Wait, the previous regex was: (\\{\\s*id:\\s*"${id}"[\\s\\S]*?\\}(\\s*,)?)
// And replacement was: /* $1 */\n  
// So we just replace `/* { id: "..." ... } */\n  ` with `{ id: "..." ... }`

// Let's just do an exact match of the prefix and suffix!
content = content.replace(/\/\* (\{[\s\S]*?id:\s*"seap[^\"]+"[\s\S]*?\}(\s*,)?) \*\/\n  /g, '$1');

// And revert 50W06 back to 50K15 just in case
content = content.replace(/id:\s*"seapur-50w06"/g, 'id: "seapur-50k15"');
content = content.replace(/name:\s*"SEAPUR 50W06"/g, 'name: "SEAPUR 50K15"');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Revert complete');
