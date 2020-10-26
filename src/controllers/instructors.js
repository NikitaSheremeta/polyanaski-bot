const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const { match } = require('telegraf-i18n');
const Messages = require('../helpers/messages');
const Keyboards = require('../helpers/keyboards');
const { logger } = require('../util/logger');

const { leave } = Stage;
const scene = new Scene('instructors');

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters the instructors scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  keyboards.escapeKey = true;

  await ctx.reply(messages.instructors, keyboards.trains);
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the instructors scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  keyboards.extraMarkdown = true;

  await ctx.reply(messages.mainMenu, keyboards.main);
});

scene.hears(match('training.individualAndGroup'), async (ctx) => {
  const messages = new Messages(ctx);

  await ctx.reply(messages.workInProgress);
});

scene.hears(match('categories.childrensSchool'), async (ctx) => {
  const messages = new Messages(ctx);

  await ctx.reply(messages.workInProgress);
});

scene.hears(match('categories.freeride'), async (ctx) => {
  const messages = new Messages(ctx);

  await ctx.reply(messages.workInProgress);
});

scene.hears(match('navigation.back'), leave());

module.exports = { instructors: scene };
