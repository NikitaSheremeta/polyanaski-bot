const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const { match } = require('telegraf-i18n');
const Messages = require('../helpers/messages');
const Keyboards = require('../helpers/keyboards');
const { logger } = require('../util/logger');

const { leave } = Stage;
const scene = new Scene('ski-passes');

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters the ski passes scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  // Setting keyboard keys
  keyboards.SSPKey = true;
  keyboards.escapeKey = true;

  await ctx.reply(messages.skiPasses, keyboards.resorts);
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the ski passes scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  // Setting extra markdown for the buttons
  keyboards.extraMarkdown = true;

  await ctx.reply(messages.mainMenu, keyboards.main);
});

scene.hears(match('navigation.back'), leave());

module.exports = { skiPasses: scene };
