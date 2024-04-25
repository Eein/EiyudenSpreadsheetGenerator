import fs from 'fs'
import { mkConfig, generateCsv, asString } from "export-to-csv"
import { writeFile } from "node:fs"
import { Buffer } from "node:buffer"
const outputFilename = 'enemies.csv'

// gets the shared data to locale join from the locale shared Data
function getEnemyLocaleIdFromShared(localeShared, enemyId) {
  let record = localeShared.find((l) => {
    return l.m_Key == enemyId
  })
  return record.m_Id
}

// gets the enemy name from the locale data provided by the shared join
function getEnemyNameFromLocale(locale, localeId) {
  let record = locale.find((l) => {
    return l.m_Id == localeId
  })
  return record.m_Localized
}

fs.readFile('./localization_en_shared/CharacterName Shared Data.json', 'utf8', function(err, localeSharedData) {
  if (err) throw err
  let localeShared = JSON.parse(localeSharedData).m_Entries

  fs.readFile('./localization_en/MonoBehaviour/CharacterName_en.json', 'utf8', function(err, localeData) {
    if (err) throw err
    let locale = JSON.parse(localeData).m_TableData

    fs.readFile('./DataTables/EnemyParamTable.json', 'utf8', function (err, data) {
      if (err) throw err
      data = JSON.parse(data)
      const csvConfig = mkConfig({ useKeysAsHeaders: true })
      let enemies = data.list
      let csvData = enemies.map((e) => {

        let localeId = getEnemyLocaleIdFromShared(localeShared, e._nameId)
        let name = getEnemyNameFromLocale(locale, localeId)
        return {
          id: e._id,
          name: name,
          nameId: e._nameId,
          originalId: e._originalId,
          gender: e._gender,
          address: e._address,
          kind: e._kind,
          species: e._species,
          level: e._level,
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
          hpHard: e._hpHard,
          mpHard: e._mpHard,
          physicalAttackHard: e._physicalAttackHard,
          physicalDefenseHard: e._physicalDefenseHard,
          magicalAttackHard: e._magicalAttackHard,
          magicalDefenseHard: e._magicalDefenseHard,
          speedHard: e._speedHard,
          techniqueHard: e._techniqueHard,
          charmHard: e._charmHard,
          luckHard: e._luckHard,
          armorHard: e._armorHard,
          commandPatternIdHard: e._commandPatternIdHard,
          defenseCommandId: e._defenseCommandId,
          effectScale: e._effectScale,
          directionAngleId: e._directionAngleId,
        }
      })
      const csv = generateCsv(csvConfig)(csvData)
      const csvBuffer = new Uint8Array(Buffer.from(asString(csv)))
      writeFile(outputFilename, csvBuffer, (err) => {
        if (err) throw err
        console.log("file saved: ", outputFilename)
      })
    })
  })
})
