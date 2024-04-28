import CharacterName_Shared_Data from '../../game_data/localization_en_shared/CharacterName Shared Data.json' assert { type: 'json' };
import CharacterName_en from '../../game_data/localization_en/MonoBehaviour/CharacterName_en.json' assert { type: 'json' };

const localeShared = CharacterName_Shared_Data.m_Entries;
const locale = CharacterName_en.m_TableData;

// gets the shared data to locale join from the locale shared Data
function getEnemyLocaleIdFromShared(enemyNameId) {
  let record = localeShared.find((l) => {
    return l.m_Key == enemyNameId
  })
  return record.m_Id
}

// gets the enemy name from the locale data provided by the shared join
function getEnemyNameFromLocale(localeId) {
  let record = locale.find((l) => {
    return l.m_Id == localeId
  })
  return record.m_Localized
}

export default function getEnemyName(enemyNameId) {
  const localeId = getEnemyLocaleIdFromShared(enemyNameId)
  const name = getEnemyNameFromLocale(localeId)
  return name;
}
