const Scene = require('telegraf/scenes/base');

const InlineKeyboards = require('../helpers/inline-keyboards');

const { logger } = require('../util/logger');

const Articles = require('../models/articles');

const scene = new Scene('rent');

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters the rent scene');

  const article = await Articles.findById(process.env.KP_RENT);

  const inlineKeyboards = new InlineKeyboards(ctx);

  inlineKeyboards.extraMarkdown = true;

  const message = `[${article.title}](${article.link})`;

  const label = ctx.i18n.t('util.bookAnEquipment');

  try {
    await ctx.reply(message, inlineKeyboards.booking(label));
  } catch (error) {
    logger.debug(ctx, error);
  }

  return await ctx.scene.leave();
});

scene.leave(async (ctx) => logger.debug(ctx, 'Leaves the rent scene'));

module.exports = { rent: scene };
