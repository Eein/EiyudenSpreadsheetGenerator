import LibraryEnemyTable from '../../game_data/DataTables/LibraryEnemyTable.json' assert { type: 'json' };
import EnemyDropItemTables from '../../game_data/DataTables/EnemyDropItemTable.json' assert { type: 'json' };
import LibraryText_Shared_Data from '../../game_data/localization_en_shared/FortressTownLibraryText Shared Data.json' assert { type: 'json' };
import LibraryText_en from '../../game_data/localization_en/MonoBehaviour/FortressTownLibraryText_en.json' assert { type: 'json' };

import enemies from '../../output/json/enemies.json' assert { type: 'json' };
import items from '../../output/json/items.json' assert { type: 'json' };

function getText(textID) {
  const localeID = LibraryText_Shared_Data.m_Entries.find(entry => entry.m_Key == textID).m_Id;
  const text = LibraryText_en.m_TableData.find(entry => entry.m_Id == localeID).m_Localized;
  return text;
}

function getDropData(enemyID, should_fill_empty_slots = true) {
  const drops_entries = EnemyDropItemTables.list.filter(item => item._enemyId == enemyID);
  const drops = drops_entries.map(drop => {
    const item = items[drop._itemId];
    const weight = drop._weight;
    const steal = drop._steal;
    return {
      name: item.name,
      weight,
      steal
    }
  });

  if (should_fill_empty_slots) {
    while (drops.length < 4) {
      drops.push({ name: '', weight: '', steal: '' });
    }
  }

  return drops;
}

const bestiary = LibraryEnemyTable.list.map(e => {
  const enemy = enemies[e._enemyId];
  const dlcID = e._additionalContentId;
  const areaTextID = e._areaTextID;
  const area = getText(areaTextID);
  const descriptionID = e._detailTextId
  const description = getText(descriptionID);
  const drops = getDropData(enemy.id);
  return {
    ...enemy,
    dlcID,
    area,
    drop_0_name: drops[0].name,
    drop_0_weight: drops[0].weight,
    drop_0_steal: drops[0].steal,
    drop_1_name: drops[1].name,
    drop_1_weight: drops[1].weight,
    drop_1_steal: drops[1].steal,
    drop_2_name: drops[2].name,
    drop_2_weight: drops[2].weight,
    drop_2_steal: drops[2].steal,
    drop_3_name: drops[3].name,
    drop_3_weight: drops[3].weight,
    drop_3_steal: drops[3].steal,
    description,
  }
});

export default bestiary;
