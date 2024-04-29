import areas from './areas.js';
import { writeJSON, writeCSV } from '../lib/outputers.js';

export function writeAreasCSV(filename) {
  const areas_list = Object.values(areas);
  writeCSV(filename, areas_list);
}

export const writeAreasJSON = filename => writeJSON(filename, areas);

export const writeAreas = filename => {
  writeAreasCSV(filename);
  writeAreasJSON(filename);
};
