import EnemyDropTable from '../../game_data/DataTables/EnemyDropTable.json' assert { type: 'json' };

export default function getMoneyDrop(enemyId) {
  return EnemyDropTable.list.find(entry => entry._enemyId == enemyId)._money;
}
