const Scene = require('telegraf/scenes/base');
const { match } = require('telegraf-i18n');

const Messages = require('../helpers/messages');
const Keyboards = require('../helpers/keyboards');
const InlineKeyboards = require('../helpers/inline-keyboards');

const { logger } = require('../util/logger');
const { asyncWrapper } = require('../util/error-handler');

const Articles = require('../models/articles');

const scene = new Scene('freeride');

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters the freeride scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  keyboards.escapeKey = true;

  await ctx.reply(messages.freeride, keyboards.freeride);
});

scene.hears(
  match('resorts.krasnayaPolyana'),
  asyncWrapper(async (ctx) => {
    const article = await Articles.findById(process.env.KP_FREERIDE_ID);

    const inlineKeyboards = new InlineKeyboards(ctx);

    inlineKeyboards.extraMarkdown = true;

    const message = `[${article.title}](${article.link})`;

    const label = ctx.i18n.t('util.bookAnInstructor');

    await ctx.reply(message, inlineKeyboards.booking(label));
  })
);

scene.hears(
  match('util.abkhazia'),
  asyncWrapper(async (ctx) => {
    const articles = await Articles.find({
      _id: {
        $in: [
          process.env.ABH_FREERIDE_ID,
          process.env.ABH_SKITOUR_ID
        ]
      }
    });

    const inlineKeyboards = new InlineKeyboards(ctx);

    inlineKeyboards.extraMarkdown = true;

    const label = ctx.i18n.t('util.bookATour');

    const keyboard = inlineKeyboards.booking(label);

    articles.forEach(async (item) => {
      const message = `[${item.title}](${item.link})`;

      await ctx.reply(message, keyboard);
    });
  })
);

scene.hears(
  match('navigation.back'),
  asyncWrapper(async (ctx) => {
    logger.debug(ctx, 'Leaves the freeride scene');

    await ctx.scene.enter('instructors');
  })
);

module.exports = { freeride: scene };
