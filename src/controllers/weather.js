const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const { match } = require('telegraf-i18n');
const Keyboards = require('../helpers/keyboards');
const Messages = require('../helpers/messages');
const { logger } = require('../util/logger');

const { leave } = Stage;
const scene = new Scene('weather');

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters the weather scene');

  const keyboards = new Keyboards(ctx);
  const messages = new Messages(ctx);

  await ctx.reply(messages.workInProgress, keyboards.back);
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the weather scene');

  const keyboards = new Keyboards(ctx);
  const messages = new Messages(ctx);

  await ctx.reply(messages.mainMenu, keyboards.main);
});

scene.hears(match('navigation.back'), leave());

module.exports = { weather: scene };
