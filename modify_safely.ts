import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/products.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Rename 50K15 to 50W06 globally in the file
content = content.replace(/seapur-50k15/g, 'seapur-50w06');
content = content.replace(/SEAPUR 50K15/g, 'SEAPUR 50W06');

// 2. Change `export const products: Product[] = [` to `const allProducts: Product[] = [`
content = content.replace('export const products: Product[] = [', 'const allProducts: Product[] = [');

// 3. Append the filtering logic at the end of the file
const hiddenProductsCode = `
const hiddenProducts = [
  "seapur-33g31", "seapur-33g32", "seapur-33g32a", "seapur-33g41", "seapur-33g44",
  "seapur-50k06", "seapur-50k12", "seapua-51w05", "seapua-51w08", "seapur-50g24",
  "seapur-60g10", "seapua-52w10"
];

export const products = allProducts.filter(p => !hiddenProducts.includes(p.id));
`;

content += hiddenProductsCode;

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Update complete via filter method!');
