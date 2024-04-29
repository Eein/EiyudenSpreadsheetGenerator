import enemies from '../enemies/enemies.js';
import EncountEnemyTable from '../../game_data/DataTables/EncountEnemyTable.json' assert { type: 'json' };

const groups = EncountEnemyTable.list.reduce((groups, current) => {
  const encountId = current._encountId
  if (groups[encountId] == undefined) {
    groups[encountId] = {
      encountId,
      enemies: []
    }
  }
  const enemy = {
    id: current._enemyId,
    name: enemies[current._enemyId].name,
    row: current._locationArea,
    column: current._locationIndex
  };

  groups[encountId].enemies.push(enemy);
  return groups;
}, {})

export default groups;
