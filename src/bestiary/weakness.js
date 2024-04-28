import LibraryEnemyWeakPointTable from '../../game_data/DataTables/LibraryEnemyWeakPointTable.json' assert { type: 'json' };

const weapon = [
  'Slash',
  'Thrust',
  'Blunt',
  'Grapple',
  'Throw',
]
const magic = [
  'Fire',
  'Water',
  'Wind',
  'Earth',
  'Light',
  'Dark',
];

export function getWeakness(enemyId) {
  const library_entry = LibraryEnemyWeakPointTable.list.find(entry => entry._enemyId == enemyId);
  if (!library_entry) {
    console.error(`Beastiary Weaknesses: LibraryEnemyWeakPointTable doesn't contain enemyId ${enemyId}`);
    return 'Error';
  }

  if (library_entry._weakWeaponAttribute > -1) return weapon[library_entry._weakWeaponAttribute];
  if (library_entry._weakMagicAttribute > -1) return magic[library_entry._weakMagicAttribute];
  return 'No Weaknesses';
}
