import FieldText_Shared_Data from '../../game_data/localization_en_shared/FieldText Shared Data.json' assert { type: 'json' };
import FieldText_en from '../../game_data/localization_en/MonoBehaviour/FieldText_en.json' assert { type: 'json' };

export function getAreaName(nameId) {
  const entry = FieldText_Shared_Data.m_Entries.find(field => field.m_Key == nameId);
  if (!entry) {
    console.error(`getAreaName: nameId ${nameId} not found`);
    return 'Not Found';
  }

  const m_Id = entry.m_Id;
  const name = FieldText_en.m_TableData.find(field => field.m_Id == m_Id).m_Localized;
  return name;
}
