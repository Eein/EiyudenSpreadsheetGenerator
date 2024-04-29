import EncounterTable from './encounter_table.js';
import { writeJSON, writeCSV, writeMarkdown } from '../lib/outputers.js';

export function writeEncounterTableCSV(filename) {
  const encounter_table_list = Object.values(EncounterTable);
  writeCSV(filename, encounter_table_list);
}

export function writeEncounterTableJSON(filename) {
  writeJSON(filename, EncounterTable);
}

export function writeEncounterTableMarkdown(filename) {
  let file_str = '';
  for (const [areaId, areaTable] of Object.entries(EncounterTable)) {
    file_str += `## ${areaTable.name} AreaId: ${areaId}\r`;
    areaTable.groups.forEach(group => {
      file_str += `${group.enemies.map(enemy => enemy.name).join()}\r`;
    });
    file_str += '\r';
  };
  writeMarkdown(filename, file_str);
}

export function writeEncounterTable(filename) {
  writeEncounterTableCSV(filename);
  writeEncounterTableJSON(filename);
  writeEncounterTableMarkdown(filename);
};
