const Scene = require('telegraf/scenes/base');

const Messages = require('../helpers/messages');
const InlineKeyboards = require('../helpers/inline-keyboards');

const { logger } = require('../util/logger');

const scene = new Scene('consultation');

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters the consultation scene');

  const messages = new Messages(ctx);
  const inlineKeyboards = new InlineKeyboards(ctx);

  await ctx.reply(messages.consultation, inlineKeyboards.consultation);

  return await ctx.scene.leave();
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the consultation scene');
});

module.exports = { consultation: scene };
