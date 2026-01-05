#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cp = require('child_process');

console.log('📝 Обновление документации...\n');

const docs = ['project_spec.md', 'architecture.md', 'changelog.md', 'project_status.md'];
const docsDir = path.join(process.cwd(), 'docs');

console.log('✅ Проверка:');
docs.forEach(d => {
  const exists = fs.existsSync(path.join(docsDir, d));
  console.log(\`   \${exists ? '✓' : '✗'} \${d}\`);
});

const statusFile = path.join(docsDir, 'project_status.md');
if (fs.existsSync(statusFile)) {
  const date = new Date().toISOString().split('T')[0];
  const content = fs.readFileSync(statusFile, 'utf8');
  fs.writeFileSync(statusFile, content.replace(/Последнее обновление:.*/, \`Последнее обновление: \${date}\`));
  console.log('\n✅ project_status.md обновлён');
}

try {
  cp.execSync('git add docs/', { stdio: 'inherit' });
  cp.execSync('git commit -m "docs: update"', { stdio: 'inherit' });
  console.log('\n✅ Закоммичено');
} catch {
  console.log('\n⚠��� Нет изменений');
}
