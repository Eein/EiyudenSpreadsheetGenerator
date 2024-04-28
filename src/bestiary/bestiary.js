import LibraryEnemyTable from '../../game_data/DataTables/LibraryEnemyTable.json' assert { type: 'json' };
import enemies from '../../output/json/enemies.json' assert { type: 'json' };

import { getArea, getDetail } from './locale.js';

const bestiary = LibraryEnemyTable.list.map(e => {
  const enemy = enemies[e._enemyId];
  const dlcID = e._additionalContentId;
  const area = getArea(e._areaTextID);
  const description = getDetail(e._detailTextId);
  return {
    name: enemy.name,
    id: enemy.id,
    dlcID,
    area,
    description
  }
});

export default bestiary;
