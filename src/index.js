require('dotenv').config();

const { Extra, Markup, Telegraf } = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const { leave } = Stage;

bot.start(ctx => ctx.reply('Hello World!'));

bot.launch();
