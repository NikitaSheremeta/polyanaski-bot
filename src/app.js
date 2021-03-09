/* eslint-disable max-statements */
require('dotenv').config();
require('./cron/open-trails');

const mongoose = require('mongoose');
const { Telegraf } = require('telegraf');
const TelegrafI18n = require('telegraf-i18n');
const path = require('path');
const Stage = require('telegraf/stage');
const { match } = require('telegraf-i18n');

const { start } = require('./controllers/start');
const { openTrails } = require('./controllers/open-trails');
const { trailMaps } = require('./controllers/trail-maps');
const { instructors } = require('./controllers/instructors');
const { skiPasses } = require('./controllers/ski-passes');
const { rent } = require('./controllers/rent');
const { forecast } = require('./controllers/forecast');
const { consultation } = require('./controllers/consultation');
const { childrensSchool } = require('./controllers/childrens-school');
const { freeride } = require('./controllers/freeride');

const Keyboards = require('./helpers/keyboards');

const { asyncWrapper } = require('./util/error-handler');
const { logger } = require('./util/logger');

const EXIT_CODE = 1;

mongoose.connect(process.env.DATABASE_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

mongoose.connection.on('error', (err) => {
  logger.error(
    undefined,
    `Error while establishing connection to database: %O`,
    err
  );
  process.exit(EXIT_CODE);
});

mongoose.connection.on('open', () => {
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
    instructors,
    skiPasses,
    rent,
    forecast,
    consultation,
    childrensSchool,
    freeride
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

  // Instructors scene
  bot.hears(
    match('categories.instructors'),
    asyncWrapper(async (ctx) => await ctx.scene.enter('instructors'))
  );

  // Ski passes scene
  bot.hears(
    match('categories.skiPasses'),
    asyncWrapper(async (ctx) => await ctx.scene.enter('ski-passes'))
  );

  // Rent scene
  bot.hears(
    match('categories.rent'),
    asyncWrapper(async (ctx) => await ctx.scene.enter('rent'))
  );

  // Forecast scene
  bot.hears(
    match('categories.forecast'),
    asyncWrapper(async (ctx) => await ctx.scene.enter('forecast'))
  );

  // Consultation scene
  bot.hears(
    match('categories.consultation'),
    asyncWrapper(async (ctx) => await ctx.scene.enter('consultation'))
  );

  // Сhildrens school scene
  bot.hears(
    match('categories.childrensSchool'),
    asyncWrapper(async (ctx) => await ctx.scene.enter('childrens-school'))
  );

  // Freeride scene
  bot.hears(
    match('categories.freeride'),
    asyncWrapper(async (ctx) => await ctx.scene.enter('freeride'))
  );

  // System restart command
  bot.command('restart', asyncWrapper(async (ctx) => {
    logger.debug(ctx, 'Restart command was pressed');

    const keyboards = new Keyboards(ctx);

    await ctx.reply(ctx.i18n.t('shared.restartSystem'), keyboards.main);

    return await ctx.scene.leave();
  }));

  // Catch some troubles
  bot.catch((error) => logger.error(undefined, 'Global error, %O', error));

  // Long polling mode
  bot.startPolling();
});
