import fs from 'fs';
import path from 'path';

const localesDir = path.join(process.cwd(), 'src', 'locales');
const filesToUpdate = ['zh-HK.json', 'ja.json', 'ko.json', 'ru.json'];

filesToUpdate.forEach(file => {
  const filePath = path.join(localesDir, file);
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const json = JSON.parse(data);
      
      if (json.products) {
        json.products.english_title = "Product Center";
        json.products.english_subtitle = "Product Intelligence Center";
      }
      
      fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
      console.log(`Updated ${file}`);
    } catch (err) {
      console.error(`Error updating ${file}:`, err);
    }
  } else {
    console.warn(`File not found: ${filePath}`);
  }
});
