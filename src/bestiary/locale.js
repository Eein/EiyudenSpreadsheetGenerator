import LibraryText_Shared_Data from '../../game_data/localization_en_shared/FortressTownLibraryText Shared Data.json' assert { type: 'json' };
import LibraryText_en from '../../game_data/localization_en/MonoBehaviour/FortressTownLibraryText_en.json' assert { type: 'json' };

function getText(textID) {
  const localeID = LibraryText_Shared_Data.m_Entries.find(entry => entry.m_Key == textID).m_Id;
  const text = LibraryText_en.m_TableData.find(entry => entry.m_Id == localeID).m_Localized;
  return text;
}

export function getArea(areaTextId) {
  return getText(areaTextId);
}

export function getDetail(detailTextId) {
  return getText(detailTextId);
}
