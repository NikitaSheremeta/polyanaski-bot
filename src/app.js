require('dotenv').config();

const path = require('path');
const { Telegraf } = require('telegraf');
const TelegrafI18n = require('telegraf-i18n');
const Stage = require('telegraf/stage');

const { start } = require('./controllers/start/index');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const i18n = new TelegrafI18n({
  defaultLanguage: 'ru',
  sessionName: 'session',
  allowMissing: false,
  directory: path.resolve(__dirname, './locales'),
  useSession: true
});

const stage = new Stage([start]);

bot.use(Telegraf.session());
bot.use(i18n.middleware());
bot.use(stage.middleware());

bot.start((ctx) => ctx.scene.enter('start'));

bot.startPolling();
