# Auto-Approved Commands

Эти команды Claude может выполнять без запроса подтверждения у пользователя.

## Git Commands

```bash
# Status and info
git status
git branch
git log
git diff
git show

# Branch operations
git checkout <branch>
git checkout -b <branch>
git branch -d <branch>
git pull origin <branch>
git fetch

# Commit operations
git add <files>
git commit -m "message"
git push origin <branch>
git push -u origin <branch>

# Special: Git commit with Claude signature
git commit -m "$(cat <<'EOF'
[message]

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

## NPM Commands

```bash
npm install
npm run dev
npm run build
npm run test
npm run test:e2e
npm run lint

# Custom commands
npm run merge:dev
npm run docs:update
npm run status
npm run notify "<title>" "<message>"
```

## Supabase Commands

```bash
# Via MCP tools (всегда разрешены)
mcp__supabase__list_organizations
mcp__supabase__list_projects
mcp__supabase__get_project
mcp__supabase__list_tables
mcp__supabase__list_migrations
mcp__supabase__apply_migration
mcp__supabase__execute_sql (read-only queries)
mcp__supabase__get_project_url
mcp__supabase__get_publishable_keys
mcp__supabase__generate_typescript_types
```

## Vercel Commands

```bash
# Via MCP tools (всегда разрешены)
mcp__vercel__list_teams
mcp__vercel__list_projects
mcp__vercel__get_project
mcp__vercel__list_deployments
mcp__vercel__get_deployment
mcp__vercel__get_deployment_build_logs
mcp__vercel__deploy_to_vercel
```

## GitHub Commands

```bash
# Via MCP tools (всегда разрешены для чтения)
mcp__github__get_me
mcp__github__list_branches
mcp__github__list_commits
mcp__github__list_issues
mcp__github__list_pull_requests
mcp__github__get_file_contents

# CLI commands
gh auth status
gh pr list
gh pr view <number>
gh issue list
gh repo view
```

## File Operations

```bash
mkdir -p <path>
ls <path>
pwd
cat <file> (для небольших файлов)
```

## Development

```bash
# Timeout commands для проверок
timeout 5 bash -c "sleep 5"
timeout 10 bash -c "<command>"
```

## ВАЖНО

### ❌ НИКОГДА без подтверждения:
- `git push --force`
- `git reset --hard`
- `rm -rf` (любые удаления)
- Деструктивные SQL команды (DROP, DELETE, TRUNCATE)
- Изменения production окружения
- Мердж в master ветку

### ✅ Требуют подтверждения:
- Создание PR
- Мердж PR
- Deploy в production
- Изменения в базе данных (кроме чтения)
- Удаление веток
