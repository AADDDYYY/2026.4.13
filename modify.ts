import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/products.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const targetIds = [
  "seapur-33g31",
  "seapur-33g32",
  "seapur-33g32a",
  "seapur-33g41",
  "seapur-33g44",
  "seapur-50k06",
  "seapur-50k12",
  "seapua-51w05",
  "seapua-51w08",
  "seapur-50g24",
  "seapur-60g10",
  "seapua-52w10",
  "seapur-50w06" // also comment out the old 50w06 to avoid conflicts since 50k15 will become 50w06
];

// Comment out
targetIds.forEach(id => {
  const regex = new RegExp(`(\\{\\s*id:\\s*"${id}"[\\s\\S]*?\\}(\\s*,)?)`, 'g');
  content = content.replace(regex, '/* $1 */\n  ');
});

// Rename 50K15 to 50W06
content = content.replace(/id:\s*"seapur-50k15"/g, 'id: "seapur-50w06"');
content = content.replace(/name:\s*"SEAPUR 50K15"/g, 'name: "SEAPUR 50W06"');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Update complete');
