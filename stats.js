import fs from 'fs'
import { mkConfig, generateCsv, asString } from "export-to-csv"
import { writeFile } from "node:fs"
import { Buffer } from "node:buffer"

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

function getParameterCurves(parameterCurves, id) {
  let records = parameterCurves.filter((p) => {
    return p._id == id
  })
  // maybe sort here.
  return records
}

function findParameterLevel(parameterCurve, level) {
  let record = parameterCurve.find((p) => {
    return p._level == level
  })
  return record
}

fs.readFile('./localization_en_shared/CharacterName Shared Data.json', 'utf8', function(err, localeSharedData) {
  if (err) throw err
  let localeShared = JSON.parse(localeSharedData).m_Entries

  fs.readFile('./localization_en/MonoBehaviour/CharacterName_en.json', 'utf8', function(err, localeData) {
    if (err) throw err
    let locale = JSON.parse(localeData).m_TableData

    fs.readFile('./DataTables/UnitParamTable.json', 'utf8', function (err, unitParamData) {
      let unitParams = JSON.parse(unitParamData).list
      if (err) throw err
      fs.readFile('./DataTables/ParameterCurveTable.json', 'utf8', function (err, parameterCurveData) {

        let pcd = JSON.parse(parameterCurveData).list


        // for testing
        let testUnitParams = [unitParams[37]]

        testUnitParams.forEach((e) => {
          const csvConfig = mkConfig({ useKeysAsHeaders: true })
          let localeId = getLocaleIdFromShared(localeShared, e._nameId)
          let name = getFieldFromLocale(locale, localeId, "_nameId")
          const outputFilename = `./stat-growth/${e._id}_${name}.csv`
          console.log(name)
          // For each x stats by unit stat
          // - sort params by level and render the stats
          //
          // notes:
          // technique is dex

          // {
          //   lv: 123,
          //   hp: 123,
          //   mp: 123,
          //   pwr: 123,
          //   mgc: 123,
          //   dex: 123,
          //   spd: 123,
          //   pd: 123,
          //   md: 123,
          //   luk: 123
          // }

          let csvData = []

          // check if the hp value is 0 on the first record and skip this one if so
          console.log(e)
          if(e._hp == 0){ 
            console.log("non-combat character... skipping.")
            return;
          }

          let hp = getParameterCurves(pcd, e._hp)
          let mp = getParameterCurves(pcd, e._mp)
          let pwr = getParameterCurves(pcd, e._physicalAttack)
          let mgc = getParameterCurves(pcd, e._magicalAttack)
          let dex = getParameterCurves(pcd, e._technique)
          let spd = getParameterCurves(pcd, e._speed)
          let pd = getParameterCurves(pcd, e._physicalDefense)
          let md = getParameterCurves(pcd, e._magicalDefense)
          let luk = getParameterCurves(pcd, e._luck)
          let charm = getParameterCurves(pcd, e._charm)

          let levels = [1,5,10,20,30,40,50,60,70,80,90,99]

          levels.forEach((level) => {
            csvData.push({
              level: level,
              hp: findParameterLevel(hp, level)?._value,
              mp: findParameterLevel(mp, level)?._value,
              pwr: findParameterLevel(pwr, level)?._value,
              mgc: findParameterLevel(mgc, level)?._value,
              dex: findParameterLevel(dex, level)?._value,
              spd: findParameterLevel(spd, level)?._value,
              pd: findParameterLevel(pd, level)?._value,
              md: findParameterLevel(md, level)?._value,
              luk: findParameterLevel(luk, level)?._value,
              charm: findParameterLevel(charm, level)?._value,
            })
          })
          
          // let csvData = unitParams.map((e) => {
          //   let localeId = getLocaleIdFromShared(localeShared, e._nameId)
          //   let detailLocaleId = getLocaleIdFromShared(localeShared, e._detailId)

          //   let name = getFieldFromLocale(locale, localeId, "_nameId")
          //   let detail = getFieldFromLocale(locale, detailLocaleId, "_detailId")
          //   return {
          //     id: e._id,
          //     name: name,
          //     detail: detail,
          //     nameId: "ItemName_1000",
          //     detailId: "ItemDetail_1000",
          //     price: e._price,
          //     priceHard: e._priceHard,
          //     sellPrice: e._sellPrice,
          //     possessionMax: e._possessionMax,
          //     isTargetingItem: e._isTargetingItem,
          //     itemCategory: e._itemCategory,
          //     isDisableUseField: e._isDisableUseField,
          //     categoryValue: e._categoryValue,
          //     valuable: e._valuable,
          //     sortId: e._sortId,
          //     rarity: e._rarity,
          //     notNewlyAdded: e._notNewlyAdded0
          //   }
          // })
          const csv = generateCsv(csvConfig)(csvData)
          const csvBuffer = new Uint8Array(Buffer.from(asString(csv)))
          writeFile(outputFilename, csvBuffer, (err) => {
            if (err) throw err
            console.log("file saved: ", outputFilename)
          })
        })
      })
    })
  })
})
