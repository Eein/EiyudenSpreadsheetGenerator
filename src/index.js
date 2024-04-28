import { writeCSV, writeJSON, writeFiles } from './lib/outputers.js';
import { flatten } from './lib/utils.js';
import enemies from './enemies/enemies.js';
import items from './items/items.js';
import { writeBestiary } from './bestiary/writer.js';

const enemies_list = Object.values(enemies).map(enemy => flatten(enemy));
const items_list = Object.values(items).map(item => flatten(item));

writeCSV('enemies', enemies_list);
writeJSON('enemies', enemies);
writeCSV('items', items_list);
writeJSON('items', items);
writeBestiary('bestiary');
