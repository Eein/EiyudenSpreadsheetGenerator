import { mkConfig, generateCsv, asString } from "export-to-csv"
import { writeFileSync } from "node:fs"
import { Buffer } from "node:buffer"
import path from 'path';

import { flatten } from './utils.js';

const csvConfig = mkConfig({ useKeysAsHeaders: true })

export function writeCSV(_filename, _data) {
  const filename = path.resolve(process.cwd(), 'output', 'csv', `${_filename}.csv`);
  const data = Object.values(_data).map(val => flatten(val));
  const csv = generateCsv(csvConfig)(data)
  const csvBuffer = new Uint8Array(Buffer.from(asString(csv)))
  writeFileSync(filename, csvBuffer, (err) => {
    if (err) throw err
    console.log("file saved: ", filename)
  })
}

export function writeJSON(_filename, data) {
  const filename = path.resolve(process.cwd(), 'output', 'json', `${_filename}.json`);
  writeFileSync(filename, JSON.stringify(data, null, 2), (err) => {
    if (err) throw err
    console.log("file saved: ", filename)
  })
}

export function writeMarkdown(_filename, str) {
  const filename = path.resolve(process.cwd(), 'output', 'md', `${_filename}.md`);
  writeFileSync(filename, str, err => {
    if (err) throw err
    console.log("file saved: ", filename)
  })
}

export function writeFiles(_filename, data) {
  writeCSV(_filename, data);
  writeJSON(_filename, data);
}
