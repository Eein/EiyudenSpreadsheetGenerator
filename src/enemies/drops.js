import EnemyDropItemTables from '../../game_data/DataTables/EnemyDropItemTable.json' assert { type: 'json' };

import items from '../../output/json/items.json' assert { type: 'json' };

export default function getDrops(enemyId) {
  const drops_entries = EnemyDropItemTables.list.filter(item => item._enemyId == enemyId);
  const drops = drops_entries.map(drop => {
    const item = items[drop._itemId];
    const weight = drop._weight;
    const steal = drop._steal;
    return {
      name: item.name,
      id: item.id,
      category: item.itemCategory,
      weight,
      steal
    }
  });

  return drops;
}
