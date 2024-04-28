import EnemyResistanceTable from '../../game_data/DataTables/EnemyResistanceTable.json' assert { type: 'json' };

const enemy_resistance_list = EnemyResistanceTable.list;

export function getEnemyResistances(enemyId) {
  const resistences = enemy_resistance_list.find(enemy => enemy._enemyId == enemyId);

  return {
    slash: resistences._slashValue,
    thrust: resistences._thrustValue,
    smash: resistences._smashValue,
    grapple: resistences._grappleValue,
    throw: resistences._throwValue,
    fire: resistences._fireValue,
    water: resistences._waterValue,
    wind: resistences._windValue,
    earth: resistences._earthValue,
    light: resistences._lightValue,
    dark: resistences._darkValue,
    plain: resistences._plainValue,
    poison: resistences._poisonValue,
    paralysis: resistences._paralysisValue,
    sleep: resistences._sleepValue,
    confusion: resistences._confusionValue,
    petrification: resistences._petrificationValue,
    lensSeal: resistences._lensSealValue,
    blindness: resistences._blindnessValue,
    death: resistences._deathValue,
    teleport: resistences._teleportValue,
    stun: resistences._stunValue,
    gimmick: resistences._gimmickValue,
  }
}
