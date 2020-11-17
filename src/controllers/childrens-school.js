const Scene = require('telegraf/scenes/base');
const { match } = require('telegraf-i18n');

const Messages = require('../helpers/messages');
const Keyboards = require('../helpers/keyboards');
const InlineKeyboards = require('../helpers/inline-keyboards');

const { logger } = require('../util/logger');
const { asyncWrapper } = require('../util/error-handler');

const Articles = require('../models/articles');

const scene = new Scene('childrens-school');

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters the childrens school scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  keyboards.escapeKey = true;
  keyboards.withoutGazprom = true;

  await ctx.reply(messages.childrensSchool, keyboards.resorts)
    .catch((error) => logger.debug(ctx, error));
});

scene.hears(
  match('resorts.krasnayaPolyana'),
  asyncWrapper(async (ctx) => {
    const article = await Articles.findById(process.env.KP_CHILDRENS_ID);

    const inlineKeyboards = new InlineKeyboards(ctx);

    inlineKeyboards.extraMarkdown = true;

    const message = `[${article.title}](${article.link})`;

    await ctx.reply(message, inlineKeyboards.booking())
      .catch((error) => logger.debug(ctx, error));
  })
);

scene.hears(
  match('resorts.rosaKhutor'),
  asyncWrapper(async (ctx) => {
    const article = await Articles.findById(process.env.RK_CHILDRENS_ID);

    const inlineKeyboards = new InlineKeyboards(ctx);

    inlineKeyboards.extraMarkdown = true;

    const message = `[${article.title}](${article.link})`;

    await ctx.reply(message, inlineKeyboards.booking())
      .catch((error) => logger.debug(ctx, error));
  })
);

scene.hears(
  match('navigation.back'),
  asyncWrapper(async (ctx) => {
    logger.debug(ctx, 'Leaves the childrens school scene');

    await ctx.scene.enter('instructors');
  })
);

module.exports = { childrensSchool: scene };
