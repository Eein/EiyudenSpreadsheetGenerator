import { writeEnemies } from './enemies/writer.js';
import { writeItems } from './items/writer.js';
import { writeBestiary } from './bestiary/writer.js';
import { writeEncounterTable } from './encounter_table/writer.js';
import { writeSkills } from './skills/writer.js';

writeEnemies('enemies');
writeItems('items');
writeBestiary('bestiary');
writeEncounterTable('encounter_table');
writeSkills('skills');
