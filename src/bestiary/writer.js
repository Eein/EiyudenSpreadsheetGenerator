import bestiary from './bestiary.js';
import { writeJSON, writeCSV } from '../lib/outputers.js';


export function writeBestiaryCSV(filename) {
  const bestiary_list = Object.values(bestiary);
  bestiary_list.forEach(entry => {
    while (entry.drops.length < 4) {
      entry.drops.push({
        name: '',
        id: '',
        category: '',
        weight: '',
        steal: '',
      });
    }
  });
  writeCSV(filename, bestiary_list);
}

export const writeBestiaryJSON = filename => writeJSON(filename, bestiary);

export const writeBestiary = filename => {
  writeBestiaryCSV(filename);
  writeBestiaryJSON(filename);
};
