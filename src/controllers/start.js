const { match } = require('telegraf-i18n');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const Keyboards = require('../helpers/keyboards');
const Messages = require('../helpers/messages');
const { logger } = require('../util/logger');

const DELAY = 1600;

const { leave } = Stage;
const scene = new Scene('start');

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters start scene');

  const keyboards = new Keyboards(ctx);
  const messages = new Messages(ctx);

  await ctx.reply(messages.greeting).then(() => {
    setTimeout(() => ctx.reply(messages.description, keyboards.launch), DELAY);
  });
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the start scene');

  const keyboards = new Keyboards(ctx);
  const messages = new Messages(ctx);

  await ctx.reply(messages.go, keyboards.main);
});

scene.hears(match('shared.launch'), leave());

module.exports = { start: scene };
