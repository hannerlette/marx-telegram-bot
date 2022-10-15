require('dotenv').config({
    path: `${__dirname}/.env`
});
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const regex = /((г|Г)ек{0,2}он)|((м|М)аркс)|((я|Я)щер)/g;

function getRandomPhoto() {
    const files = fs.readdirSync(`${__dirname}/photos`)
    return files[Math.floor(Math.random() * files.length)] 
}

bot.onText(regex, (msg) => {
    const file = getRandomPhoto();
    bot.sendPhoto(msg.chat.id, `${__dirname}/photos/${file}`, { caption: '' });
});

bot.on('polling_error', console.error);