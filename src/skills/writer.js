import skills from './skills.js';
import { writeJSON, writeCSV } from '../lib/outputers.js';

export function writeSkillsCSV(filename) {
  const skills_list = Object.values(skills);
  writeCSV(filename, skills_list);
}

export function writeSkillsJSON(filename) {
  writeJSON(filename, skills);
}

export function writeSkills(filename) {
  writeSkillsCSV(filename);
  writeSkillsJSON(filename);
};
