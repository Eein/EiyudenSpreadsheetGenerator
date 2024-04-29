// import { mkConfig, generateCsv, asString } from "export-to-csv"
// import { writeFile } from "node:fs"
// import { Buffer } from "node:buffer"
// import enemies from '../enemies/enemies.js';
// import BattleSceneTable from './DataTables/BattleSceneTable.json' assert { type: 'json' };
// import EncountGroupTable from './DataTables/EncountGroupTable.json' assert { type: 'json' };
// import EncountEnemyTable from './DataTables/EncountEnemyTable.json' assert { type: 'json' };
// import EncountTable from './DataTables/EncountTable.json' assert { type: 'json' };
import FieldMapTable from '../../game_data/DataTables/FieldMapTable.json' assert { type: 'json' };
// import FieldTable from './DataTables/FieldTable.json' assert { type: 'json' };
import FieldText_Shared_Data from '../../game_data/localization_en_shared/FieldText Shared Data.json' assert { type: 'json' };
import FieldText_en from '../../game_data/localization_en/MonoBehaviour/FieldText_en.json' assert { type: 'json' };

const fields = FieldMapTable.list;
const areas = fields.map(field => {
  const name = getAreaName(field._areaName);
  if (name === null) {
    return null
  };

  return {
    name,
    ...field,
  }
}).filter(area => area != null);

console.log(JSON.stringify(areas, null, 2));

// const groups = EncountEnemyTable.list.reduce((groups, current) => {
//   const encountId = current._encountId
//   if (groups[encountId] == undefined) groups[encountId] = [];
//   const info = {
//     encountId,
//     enemyId: current._enemyId,
//     enemy: enemies[current._enemyId],
//     row: current._locationArea,
//     column: current._locationIndex
//   };

//   groups[encountId].push(info);
//   return groups;
// }, {})

// const encounter_table = {};
// EncountGroupTable.list.forEach(entry => {
//   const group = groups[entry._encountId];
//   if (!group) {
//     console.log(JSON.stringify(entry, null, 2));
//     return;
//   }

//   const area_id = entry._id;
//   if (encounter_table[area_id] === undefined) encounter_table[area_id] = [];
//   encounter_table[area_id].push(group);
// });

// // console.log(JSON.stringify(encounter_table, null, 2));

// for (const [areaId, groups] of Object.entries(encounter_table)) {
//   const first_enemy_encount_id = groups[0][0].encountId;
//   const battleSceneId = EncountTable.list.find(enc => enc._id == first_enemy_encount_id)._battleSceneId;
//   const battleSceneAddress = BattleSceneTable.list.find(bs => bs._id == battleSceneId)._address;
//   console.log(`## ${battleSceneAddress}, Area ID: ${areaId}, Enemy EncountID: ${first_enemy_encount_id}`);
//   groups.forEach(group => console.log(group.map(e => e.enemy.name).join()));
//   console.log('');
// };

function getAreaName(nameID) {
  const entry = FieldText_Shared_Data.m_Entries.find(field => field.m_Key == nameID);
  if (!entry) {
    // console.error(nameID, 'not found');
    return null;
  }

  const m_Id = entry.m_Id;
  const name = FieldText_en.m_TableData.find(field => field.m_Id == m_Id).m_Localized;
  return name;
}
