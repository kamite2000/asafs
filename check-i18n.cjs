const fs = require('fs');
const en = JSON.parse(fs.readFileSync('src/i18n/locales/en/translation.json'));
const fr = JSON.parse(fs.readFileSync('src/i18n/locales/fr/translation.json'));
const swa = JSON.parse(fs.readFileSync('src/i18n/locales/swa/translation.json'));

const flatKeys = (obj, prefix = '') => {
  const keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'object' && v !== null) {
      keys.push(...flatKeys(v, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
};

const enKeys = new Set(flatKeys(en));
const frKeys = new Set(flatKeys(fr));
const swaKeys = new Set(flatKeys(swa));

const missing_fr = [...enKeys].filter(k => !frKeys.has(k));
const missing_swa = [...enKeys].filter(k => !swaKeys.has(k));

console.log('\n📊 STATISTIQUES DES TRADUCTIONS');
console.log('================================');
console.log(`EN:  ${enKeys.size} clés`);
console.log(`FR:  ${frKeys.size} clés`);
console.log(`SWA: ${swaKeys.size} clés`);

if (missing_fr.length === 0 && missing_swa.length === 0) {
  console.log('\n✅ Toutes les clés sont cohérentes!');
} else {
  if (missing_fr.length > 0) {
    console.log(`\n❌ ${missing_fr.length} clés manquantes en FR:`);
    missing_fr.forEach(k => console.log(`   - ${k}`));
  }
  if (missing_swa.length > 0) {
    console.log(`\n❌ ${missing_swa.length} clés manquantes en SWA:`);
    missing_swa.forEach(k => console.log(`   - ${k}`));
  }
}
