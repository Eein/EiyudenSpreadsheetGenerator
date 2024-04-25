import fs from 'fs'
import { mkConfig, generateCsv, asString } from "export-to-csv"
import { writeFile } from "node:fs"
import { Buffer } from "node:buffer"
const outputFilename = 'skills.csv'

// gets the shared data to locale join from the locale shared Data
function getLocaleIdFromShared(localeShared, id) {
  let record = localeShared.find((l) => {
    return l.m_Key == id
  })
  if(record) {

  return record.m_Id
  } else {
    return false
  }
}

// gets the enemy name from the locale data provided by the shared join
function getFieldFromLocale(locale, localeId, fieldName) {
  if(localeId == false) return ""
  let record = locale.find((l) => {
    return l.m_Id == localeId
  })
  if(record) {
    return record.m_Localized
  } else {
    return ""
  }
}

fs.readFile('./localization_en_shared/SkillText Shared Data.json', 'utf8', function(err, localeSharedData) {
  if (err) throw err
  let localeShared = JSON.parse(localeSharedData).m_Entries

  fs.readFile('./localization_en/MonoBehaviour/SkillText_en.json', 'utf8', function(err, localeData) {
    if (err) throw err
    let locale = JSON.parse(localeData).m_TableData

    fs.readFile('./DataTables/SkillTable.json', 'utf8', function (err, data) {
      if (err) throw err
      data = JSON.parse(data)
      const csvConfig = mkConfig({ useKeysAsHeaders: true })
      let listData = data.list
      let csvData = listData.map((e) => {
        let localeId = getLocaleIdFromShared(localeShared, e._nameId)
        let detailLocaleId = getLocaleIdFromShared(localeShared, e._detailId)

        let name = getFieldFromLocale(locale, localeId, "_nameId")
        let detail = getFieldFromLocale(locale, detailLocaleId, "_detailId")
        return {
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
