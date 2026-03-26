const fs = require('fs');

const files = [
  'lib/guide-sitemap.ts', 'lib/discoverable-urls.ts',
  'components/related-guides.tsx', 'components/guide-cross-links.tsx',
  'app/sitemap.ts', 'app/sectors/page.tsx',
  'app/sector/[sector-slug]/page.tsx', 'app/sector/[sector-slug]/[subpage]/page.tsx',
  'app/regulations/page.tsx', 'app/page.tsx',
  'app/guide/[sector-slug]/[regulations-slug]/page.tsx',
  'app/regulation/[regulation-slug]/page.tsx',
  'lib/catalog.ts', 'lib/content-service.ts',
  'lib/expanded-content.ts', 'app/llms.txt/route.ts'
];

let total = 0;
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  const orig = content;

  content = content.replace(/\/guia\//g, '/guide/');
  content = content.replace(/\/normativa\//g, '/regulation/');

  // exact replacements for slugs
  content = content.replace(/"rgpd"/g, '"gdpr"');
  content = content.replace(/'rgpd'/g, "'gdpr'");
  content = content.replace(/`rgpd`/g, '`gdpr`');
  content = content.replace(/rgpdSlug/g, 'gdprSlug');
  content = content.replace(/rgpdSectors/g, 'gdprSectors');

  content = content.replace(/"llei-cookies"/g, '"cookie-law"');
  content = content.replace(/'llei-cookies'/g, "'cookie-law'");
  content = content.replace(/`llei-cookies`/g, '`cookie-law`');

  content = content.replace(/"lopd-gdd"/g, '"spanish-lopdgdd"');

  if (content !== orig) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
    total++;
  }
}
console.log('Total files modified: ' + total);
