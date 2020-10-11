require('dotenv').config();

const { Telegraf } = require('telegraf');
const TelegrafI18n = require('telegraf-i18n');
const path = require('path');
const Stage = require('telegraf/stage');
const { match } = require('telegraf-i18n');
const { start } = require('./controllers/start');
const { contacts } = require('./controllers/contacts');
const { asyncWrapper } = require('./util/error-handler');
const { logger } = require('./util/logger');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const i18n = new TelegrafI18n({
  defaultLanguage: 'ru',
  sessionName: 'session',
  allowMissing: false,
  directory: path.resolve(__dirname, './locales'),
  useSession: true
});

const stage = new Stage([start, contacts]);

bot.use(Telegraf.session());
bot.use(i18n.middleware());
bot.use(stage.middleware());

bot.start(asyncWrapper(async (ctx) => await ctx.scene.enter('start')));

bot.hears(
  match('categories.consultation'),
  asyncWrapper(async (ctx) => await ctx.scene.enter('contacts'))
);

bot.catch((error) => logger.error(undefined, 'Global error, %O', error));

bot.startPolling();
