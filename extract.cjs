const fs = require('fs');
const content = fs.readFileSync('src/app/pages/java-versions_5.html', 'utf8');

let versionsStr = '';
let dsaStr = '';

const vMatch = content.match(/const\s+versions\s*=\s*\[/);
const vStart = vMatch ? vMatch.index : -1;
const stateMarkerEnd = content.indexOf('let viewed', vStart);

if (vStart !== -1) {
  let end = content.lastIndexOf('];', stateMarkerEnd);
  versionsStr = content.substring(vStart, end + 2).trim();
}

const dMatch = content.match(/const\s+dsaCategories\s*=\s*\[/);
const dStart = dMatch ? dMatch.index : -1;
const dEnd = content.indexOf("document.getElementById('dsa-content')");

if (dStart !== -1 && dEnd !== -1) {
  let end = content.lastIndexOf('];', dEnd);
  dsaStr = content.substring(dStart, end + 2).trim();
}

versionsStr = versionsStr.replace(/^const\s+versions\s*=\s*/, 'export const versions = ');
dsaStr = dsaStr.replace(/^const\s+dsaCategories\s*=\s*/, 'export const dsaCategories = ');

fs.writeFileSync('src/app/data/academyData.ts', versionsStr + ';\n\n' + dsaStr + ';\n');
console.log('Extraction complete! DSA found:', dStart !== -1);
