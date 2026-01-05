#!/usr/bin/env node

const cp = require('child_process');
const fs = require('fs');
const path = require('path');

function exec(cmd) {
  try {
    return cp.execSync(cmd, { encoding: 'utf8', stdio: 'inherit' });
  } catch (err) {
    console.error('❌ Ошибка:', cmd);
    process.exit(1);
  }
}

function getBranch() {
  return cp.execSync('git branch --show-current', { encoding: 'utf8' }).trim();
}

function updateChangelog(branch) {
  const file = path.join(process.cwd(), 'docs', 'changelog.md');
  const date = new Date().toISOString().split('T')[0];
  const name = branch.replace('feature/', '');
  const entry = \`\n## \${date} - \${name}\n- Merged: \${name}\n- Branch: \${branch}\n\`;
  const content = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, content.replace('# Changelog\n', \`# Changelog\n\${entry}\`));
  console.log('✅ changelog.md обновлён');
}

function updateStatus(branch) {
  const file = path.join(process.cwd(), 'docs', 'project_status.md');
  const name = branch.replace('feature/', '');
  const date = new Date().toISOString().split('T')[0];
  const content = fs.readFileSync(file, 'utf8');
  const updated = content
    .replace(/Последнее обновление:.*/, \`Последнее обновление: \${date}\`)
    .replace(/Последняя фича:.*/, \`Последняя фича: \${name} (merged to dev)\`);
  fs.writeFileSync(file, updated);
  console.log('✅ project_status.md обновлён');
}

console.log('🔄 Мердж в dev...\n');

const branch = getBranch();

if (!branch.startsWith('feature/')) {
  console.error('❌ Не feature ветка:', branch);
  process.exit(1);
}

console.log('📍 Ветка:', branch);

exec('git checkout dev');
exec('git pull origin dev');
exec(\`git merge \${branch} --no-ff -m "Merge \${branch} into dev"\`);

updateChangelog(branch);
updateStatus(branch);

exec('git add docs/');
exec(\`git commit -m "docs: update after merging \${branch}"\`);
exec('git push origin dev');
exec(\`git branch -d \${branch}\`);

console.log('\n✅ Готово!');

const name = branch.replace('feature/', '');
const notify = path.join(__dirname, 'notify.js');
exec(\`node "\${notify}" "🎉 Мердж в DEV" "Фича: \${name}\\nСтатус: merged to dev"\`);
