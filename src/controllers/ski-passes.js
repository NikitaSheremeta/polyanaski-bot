const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const { match } = require('telegraf-i18n');

const Messages = require('../helpers/messages');
const Keyboards = require('../helpers/keyboards');
const InlineKeyboards = require('../helpers/inline-keyboards');

const { logger } = require('../util/logger');
const { asyncWrapper } = require('../util/error-handler');

const Articles = require('../models/articles');

const { leave } = Stage;
const scene = new Scene('ski-passes');

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters the ski passes scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  // Setting keyboard keys
  // keyboards.SSPKey = true;
  keyboards.escapeKey = true;

  try {
    await ctx.reply(messages.skiPasses, keyboards.resorts);
  } catch (error) {
    logger.debug(ctx, error);
  }
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the ski passes scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  // Setting extra markdown for the buttons
  keyboards.extraMarkdown = true;

  try {
    await ctx.reply(messages.mainMenu, keyboards.main);
  } catch (error) {
    logger.debug(ctx, error);
  }
});

scene.hears(
  match('util.singleSkiPass'),
  asyncWrapper(async (ctx) => {
    const messages = new Messages(ctx);

    try {
      await ctx.reply(messages.workInProgress);
    } catch (error) {
      logger.debug(ctx, error);
    }
  })
);

scene.hears(
  match('resorts.krasnayaPolyana'),
  asyncWrapper(async (ctx) => {
    const article = await Articles.findById(process.env.KP_SKI_PASSES);

    const inlineKeyboards = new InlineKeyboards(ctx);

    inlineKeyboards.extraMarkdown = true;

    const message = `[${article.title}](${article.link})`;

    const resort = ctx.i18n.t('resorts.krasnayaPolyana');

    try {
      await ctx.reply(message, inlineKeyboards.buySkiPass(resort));
    } catch (error) {
      logger.debug(ctx, error);
    }
  })
);

scene.hears(
  match('resorts.rosaKhutor'),
  asyncWrapper(async (ctx) => {
    const article = await Articles.findById(process.env.RK_SKI_PASSES);

    const inlineKeyboards = new InlineKeyboards(ctx);

    inlineKeyboards.extraMarkdown = true;

    const message = `[${article.title}](${article.link})`;

    const resort = ctx.i18n.t('resorts.rosaKhutor');

    try {
      await ctx.reply(message, inlineKeyboards.buySkiPass(resort));
    } catch (error) {
      logger.debug(ctx, error);
    }
  })
);

scene.hears(
  match('resorts.gazprom'),
  asyncWrapper(async (ctx) => {
    const article = await Articles.findById(process.env.GP_SKI_PASSES);

    const inlineKeyboards = new InlineKeyboards(ctx);

    inlineKeyboards.extraMarkdown = true;

    const message = `[${article.title}](${article.link})`;

    const resort = ctx.i18n.t('resorts.gazprom');

    try {
      await ctx.reply(message, inlineKeyboards.buySkiPass(resort));
    } catch (error) {
      logger.debug(ctx, error);
    }
  })
);

scene.hears(match('navigation.back'), leave());

module.exports = { skiPasses: scene };
