#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cp = require('child_process');

console.log('📊 Статус Task Manager\n');

const branch = cp.execSync('git branch --show-current', { encoding: 'utf8' }).trim();
const changes = cp.execSync('git status --short', { encoding: 'utf8' }).trim();

console.log('🔀 Git:');
console.log(\`   Ветка: \${branch}\`);
console.log(\`   Изменения: \${changes ? 'Есть' : 'Нет'}\`);

const statusFile = path.join(process.cwd(), 'docs', 'project_status.md');
if (fs.existsSync(statusFile)) {
  console.log('\n📄 Status:\n');
  console.log(fs.readFileSync(statusFile, 'utf8'));
} else {
  console.log('\n⚠��� project_status.md не найден');
}

console.log('\n📝 Коммиты:');
console.log(cp.execSync('git log --oneline -5', { encoding: 'utf8' }));
