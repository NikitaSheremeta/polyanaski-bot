const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
// const Extra = require('telegraf/extra');
const { match } = require('telegraf-i18n');
const Messages = require('../helpers/messages');
const Keyboards = require('../helpers/keyboards');
const { logger } = require('../util/logger');

const { leave } = Stage;
const scene = new Scene('childrens-school');
// const markup = Extra.markdown();

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters the childrens school scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  keyboards.escapeKey = true;
  keyboards.withoutGazprom = true;

  await ctx.reply(messages.childrensSchool, keyboards.resorts);
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the childrens school scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  keyboards.extraMarkdown = true;

  await ctx.reply(messages.mainMenu, keyboards.main);
});

scene.hears(match('resorts.krasnayaPolyana'), async (ctx) => {
  const messages = new Messages(ctx);

  await ctx.reply(messages.workInProgress);
});

scene.hears(match('resorts.rosaKhutor'), async (ctx) => {
  const messages = new Messages(ctx);

  await ctx.reply(messages.workInProgress);
});

scene.hears(match('navigation.back'), leave());

module.exports = { childrensSchool: scene };
