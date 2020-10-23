require('dotenv').config();

const { Telegraf } = require('telegraf');
const TelegrafI18n = require('telegraf-i18n');
const path = require('path');
const Stage = require('telegraf/stage');
const { match } = require('telegraf-i18n');
const { start } = require('./controllers/start');
const { openTrails } = require('./controllers/open-trails');
const { trailMaps } = require('./controllers/trail-maps');
const { skiPasses } = require('./controllers/ski-passes');
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

const stage = new Stage([
  start,
  openTrails,
  trailMaps,
  skiPasses
]);

bot.use(Telegraf.session());
bot.use(i18n.middleware());
bot.use(stage.middleware());

// Bot launch
bot.start(asyncWrapper(async (ctx) => await ctx.scene.enter('start')));

// Open trails scene
bot.hears(
  match('categories.openTrails'),
  asyncWrapper(async (ctx) => await ctx.scene.enter('open-trails'))
);

// Trail maps scene
bot.hears(
  match('categories.trailMaps'),
  asyncWrapper(async (ctx) => await ctx.scene.enter('trail-maps'))
);

// Ski passes scene
bot.hears(
  match('categories.skiPasses'),
  asyncWrapper(async (ctx) => await ctx.scene.enter('ski-passes'))
);

// Catch some troubles
bot.catch((error) => logger.error(undefined, 'Global error, %O', error));

// Long polling mode
bot.startPolling();
