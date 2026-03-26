const fs = require('fs');
const path = require('path');

function walk(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(file)) {
        walk(full, files);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js')) {
      files.push(full);
    }
  }
  return files;
}

const filesToProcess = [
  ...walk(path.join(__dirname, 'app')),
  ...walk(path.join(__dirname, 'components')),
  ...walk(path.join(__dirname, 'lib'))
];

let total = 0;
for (const file of filesToProcess) {
  let content = fs.readFileSync(file, 'utf8');
  const orig = content;

  content = content.replace(/\/guia\//g, '/guide/');
  content = content.replace(/\/normativa\//g, '/regulation/');
  
  content = content.replace(/"rgpd"/g, '"gdpr"');
  content = content.replace(/'rgpd'/g, "'gdpr'");
  content = content.replace(/`rgpd`/g, '`gdpr`');
  content = content.replace(/rgpdSlug/g, 'gdprSlug');
  content = content.replace(/rgpdSectors/g, 'gdprSectors');
  content = content.replace(/rgpd:/g, 'gdpr:'); // Object keys
  
  content = content.replace(/"llei-cookies"/g, '"cookie-law"');
  content = content.replace(/'llei-cookies'/g, "'cookie-law'");
  content = content.replace(/`llei-cookies`/g, '`cookie-law`');
  content = content.replace(/"llei-cookies":/g, '"cookie-law":');

  content = content.replace(/"lopd-gdd"/g, '"spanish-lopdgdd"');

  if (content !== orig) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
    total++;
  }
}
console.log('Total files modified: ' + total);
