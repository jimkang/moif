/* global process, __dirname */

var fs = require('fs');
var path = require('path');
var minimist = require('minimist');

var { encounterDir } = minimist(process.argv.slice(2));

if (!encounterDir) {
  console.log(
    `Usage: node tools/build-encounter-dict.js
  --encounterDir <e.g. encounters>
  > <new file with encounter dict>`
  );
  process.exit();
}

const encounterDirPath = path.join(__dirname, '..', encounterDir);

var fileBasenames = fs
  .readdirSync(encounterDirPath)
  .filter(isAnEncounterFile)
  .map(dropExtension);
//console.log(fileBasenames);
var varNames = fileBasenames.map(toCamelCase);
//console.log(varNames);

var moduleFileContents = '';

for (var i = 0; i < fileBasenames.length; ++i) {
  moduleFileContents += `import { ${varNames[i]} } from './${fileBasenames[i]}';\n`;
}

moduleFileContents += `
import { Encounter } from '../types';

export var encounterDict: Record<string, Encounter> = {
  ${varNames.join(',\n  ')}
};
`;

console.log(moduleFileContents);

function isAnEncounterFile(filename) {
  return filename.endsWith('.ts') && filename !== 'index.ts';
}

function toCamelCase(s) {
  return s.replace(/-(\w)/g, provideReplacement);
}

function provideReplacement(match, captured) {
  return captured.toUpperCase();
}

function dropExtension(s) {
  return path.basename(s, '.ts');
}
