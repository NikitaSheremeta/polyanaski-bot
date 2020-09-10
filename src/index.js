require('dotenv').config();

const path = require('path');
const { Telegraf } = require('telegraf');
const Stage = require('telegraf/stage');
const TelegrafI18n = require('telegraf-i18n');

const { start } = require('./controllers/start/index');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const stage = new Stage([start]);

const i18n = new TelegrafI18n({
  defaultLanguage: 'ru',
  sessionName: 'session',
  allowMissing: false,
  directory: path.resolve(__dirname, './locales'),
  useSession: true,
});

bot.use(Telegraf.session());
bot.use(stage.middleware());
bot.use(i18n.middleware());

bot.start((ctx) => ctx.scene.enter('start'));

bot.startPolling();
