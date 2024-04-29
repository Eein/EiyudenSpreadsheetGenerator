import groups from './enemy_groups.js';
import EncountGroupTable from '../../game_data/DataTables/EncountGroupTable.json' assert { type: 'json' };
import { getBattleSceneAddress } from './battle_scene.js';

const encounter_table = {};

EncountGroupTable.list.forEach(entry => {
  const group = groups[entry._encountId];
  if (!group) {
    console.error(`Encounter Table: group with encountId ${entry._encountId} not found`);
    return;
  }

  const area_id = entry._id;
  if (encounter_table[area_id] === undefined) encounter_table[area_id] = {
    name: getBattleSceneAddress(group.encountId),
    groups: [],
  }
  encounter_table[area_id].groups.push(group);
});

export default encounter_table;
