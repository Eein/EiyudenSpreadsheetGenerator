import enemies from './enemies.js';
import { writeJSON, writeCSV } from '../lib/outputers.js';

export function writeEnemiesCSV(filename) {
  const enemies_list = Object.values(enemies);
  writeCSV(filename, enemies_list);
}

export const writeEnemiesJSON = filename => writeJSON(filename, enemies);

export const writeEnemies = filename => {
  writeEnemiesCSV(filename);
  writeEnemiesJSON(filename);
};
