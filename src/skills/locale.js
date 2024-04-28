import SkillText_en from '../../game_data/localization_en/MonoBehaviour/SkillText_en.json' assert { type: 'json' };
import SkillText_Shared_Data from '../../game_data/localization_en_shared/SkillText Shared Data.json' assert { type: 'json' };

const localeShared = SkillText_Shared_Data.m_Entries;
const locale = SkillText_en.m_TableData;

function getLocaleIdFromShared(id) {
  let record = localeShared.find((l) => {
    return l.m_Key == id
  })
  if(record) {

  return record.m_Id
  } else {
    return false
  }
}

// gets the enemy name from the locale data provided by the shared join
function getFieldFromLocale(localeId) {
  if(localeId == false) return ""
  let record = locale.find((l) => {
    return l.m_Id == localeId
  })
  if(record) {
    return record.m_Localized
  } else {
    return ""
  }
}

export function getName(nameId) {
  const localeId = getLocaleIdFromShared(nameId)
  const name = getFieldFromLocale(localeId)
  return name;
}

export function getDetail(detailId) {
  const detailLocaleId = getLocaleIdFromShared(detailId)
  const detail = getFieldFromLocale(detailLocaleId)
  return detail;
}
