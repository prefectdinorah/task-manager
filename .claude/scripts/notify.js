#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const BOT_TOKEN = config.telegram.botToken;
const CHAT_ID = config.telegram.chatId;

const title = process.argv[2] || 'Уведомление';
const message = process.argv[3] || 'Обновление проекта';

const fullMessage = `🔔 *Task Manager*

*${title}*

${message}

_Отправлено из Claude Code_`;

const data = JSON.stringify({
  chat_id: CHAT_ID,
  text: fullMessage,
  parse_mode: 'Markdown'
});

const options = {
  hostname: 'api.telegram.org',
  port: 443,
  path: `/bot${BOT_TOKEN}/sendMessage`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Уведомление отправлено');
    } else {
      console.error('❌ Ошибка:', responseData);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Ошибка:', error.message);
});

req.write(data);
req.end();
