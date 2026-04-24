import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/products.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// There are two "seapur-50w06" now. The first one is at line 1021.
// Let's replace the first one with "seapur-50w06-old"
let occurrence = 0;
content = content.replace(/seapur-50w06/g, (match) => {
  occurrence++;
  if (occurrence === 1) { // The original one
    return "seapur-50w06-old";
  }
  return match; // The one that was renamed from 50k15
});

// Now add "seapur-50w06-old" to hiddenProducts
content = content.replace(/"seapua-52w10"/, '"seapua-52w10",\n  "seapur-50w06-old"');

fs.writeFileSync(filePath, content, 'utf-8');
