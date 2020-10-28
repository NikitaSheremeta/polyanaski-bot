const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const { match } = require('telegraf-i18n');
const Messages = require('../helpers/messages');
const Keyboards = require('../helpers/keyboards');
const { logger } = require('../util/logger');
const { asyncWrapper } = require('../util/error-handler');

const { leave } = Stage;
const scene = new Scene('open-trails');

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters the open trails scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  keyboards.escapeKey = true;

  await ctx.reply(messages.openTrails, keyboards.resorts);
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the open trails scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  keyboards.extraMarkdown = true;

  await ctx.reply(messages.mainMenu, keyboards.main);
});

scene.hears(
  match('resorts.krasnayaPolyana'),
  asyncWrapper(async (ctx) => {
    const messages = new Messages(ctx);

    await ctx.reply(messages.workInProgress);
  })
);

scene.hears(
  match('resorts.rosaKhutor'),
  asyncWrapper(async (ctx) => {
    const messages = new Messages(ctx);

    await ctx.reply(messages.workInProgress);
  })
);

scene.hears(
  match('resorts.gazprom'),
  asyncWrapper(async (ctx) => {
    const messages = new Messages(ctx);

    await ctx.reply(messages.workInProgress);
  })
);

scene.hears(match('navigation.back'), leave());

module.exports = { openTrails: scene };
