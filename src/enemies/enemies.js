import EnemyParamTable from '../../game_data/DataTables/EnemyParamTable.json' assert { type: 'json' };
import getEnemyName from './locale.js';
import getDrops from './drops.js';
import getMoneyDrop from './baqua.js';
import { getEnemyResistances } from './resistances.js';

const EnemyList = EnemyParamTable.list;

const enemies_json = EnemyList.reduce((tbl, e) => {
  const name = getEnemyName(e._nameId)
  const drops = getDrops(e._id);
  const money = getMoneyDrop(e._id);
  const resistances = getEnemyResistances(e._id);
  tbl[e._id] = {
    id: e._id,
    name: name,
    nameId: e._nameId,
    originalId: e._originalId,
    gender: e._gender,
    address: e._address,
    kind: e._kind,
    species: e._species,
    level: e._level,
    stats: {
      normal: {
        hp: e._hp,
        mp: e._mp,
        physicalAttack: e._physicalAttack,
        physicalDefense: e._physicalDefense,
        magicalAttack: e._magicalAttack,
        magicalDefense: e._magicalDefense,
        speed: e._speed,
        technique: e._technique,
        charm: e._charm,
        luck: e._luck,
        armor: e._armor,
        commandPatternId: e._commandPatternId,
      },
      hard: {
        hp: e._hpHard,
        mp: e._mpHard,
        physicalAttack: e._physicalAttackHard,
        physicalDefense: e._physicalDefenseHard,
        magicalAttack: e._magicalAttackHard,
        magicalDefense: e._magicalDefenseHard,
        speed: e._speedHard,
        technique: e._techniqueHard,
        charm: e._charmHard,
        luck: e._luckHard,
        armor: e._armorHard,
        commandPatternId: e._commandPatternIdHard,
      },
    },
    resistances,
    money,
    drops,
    defenseCommandId: e._defenseCommandId,
    effectScale: e._effectScale,
    directionAngleId: e._directionAngleId,
  }
  return tbl;
}, {});

export default enemies_json;
