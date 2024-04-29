import FieldMapTable from '../../game_data/DataTables/FieldMapTable.json' assert { type: 'json' };
import { getAreaName } from './locale.js';

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

return areas;
