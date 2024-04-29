import items from './items.js';
import { writeJSON, writeCSV } from '../lib/outputers.js';

export function writeItemsCSV(filename) {
  const items_list = Object.values(items);
  writeCSV(filename, items_list);
}

export const writeItemsJSON = filename => writeJSON(filename, items);

export const writeItems = filename => {
  writeItemsCSV(filename);
  writeItemsJSON(filename);
};
