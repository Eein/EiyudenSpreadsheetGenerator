import EncountTable from '../../game_data/DataTables/EncountTable.json' assert { type: 'json' };
import BattleSceneTable from '../../game_data/DataTables/BattleSceneTable.json' assert { type: 'json' };

export function getBattleSceneAddress(encountId) {
  const battleSceneId = EncountTable.list.find(enc => enc._id == encountId)._battleSceneId;
  const battleSceneAddress = BattleSceneTable.list.find(bs => bs._id == battleSceneId)._address;
  return battleSceneAddress;
}
