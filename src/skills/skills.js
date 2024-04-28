import SkillTable from '../../game_data/DataTables/SkillTable.json' assert { type: 'json' };
import { getDetail, getName } from './locale.js';

const skills_list = SkillTable.list;

const skills_json = {};
skills_list.forEach(skill => {
  let name = getName(skill._nameId)
  let detail = getDetail(skill._detailId)
  skills_json[skill._id] = {
    id: e._id,
    name: name,
    detail: detail,
    nameId: e._nameId,
    detailId: e._detailId,
    category: e._category,
    usableFlags: e._usableFlags,
    weaponAttribute: e._weaponAttribute,
    magicAttribute: -e._magicAttribute,
    efficacyId: e._efficacyId,
    costType: e._costType,
    cost: e._cost,
    sortId: e._sortId,
  }
});

export default skills_json;
