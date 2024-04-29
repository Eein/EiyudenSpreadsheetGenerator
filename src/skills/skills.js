import SkillTable from '../../game_data/DataTables/SkillTable.json' assert { type: 'json' };
import { getDetail, getName } from './locale.js';

const skills_list = SkillTable.list;

const skills_json = {};
skills_list.forEach(skill => {
  let name = getName(skill._nameId)
  let detail = getDetail(skill._detailId)

  skills_json[skill._id] = {
    id: skill._id,
    name: name,
    detail: detail,
    nameId: skill._nameId,
    detailId: skill._detailId,
    category: skill._category,
    usableFlags: skill._usableFlags,
    weaponAttribute: skill._weaponAttribute,
    magicAttribute: -skill._magicAttribute,
    efficacyId: skill._efficacyId,
    costType: skill._costType,
    cost: skill._cost,
    sortId: skill._sortId,
  }
});

export default skills_json;
