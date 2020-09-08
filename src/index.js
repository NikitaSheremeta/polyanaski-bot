require('dotenv').config();

const { Telegraf } = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');

const { opening } = require('./controllers/opening/index');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const stage = new Stage([opening]);

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => ctx.scene.enter('opening'));

bot.startPolling();
