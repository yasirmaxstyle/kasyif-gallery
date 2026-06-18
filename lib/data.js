import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'cms.json');

export function getCMSData() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    // Return empty defaults if file doesn't exist
    return { artworks: [], articles: [] };
  }
}

export function saveCMSData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}
