require('dotenv').config();

const { Telegraf, Extra, Markup } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
