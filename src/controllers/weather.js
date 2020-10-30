const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const { match } = require('telegraf-i18n');

const Keyboards = require('../helpers/keyboards');
const Messages = require('../helpers/messages');

const { logger } = require('../util/logger');
const { asyncWrapper } = require('../util/error-handler');

const { leave } = Stage;
const scene = new Scene('weather');

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters the weather scene');

  const keyboards = new Keyboards(ctx);
  const messages = new Messages(ctx);

  keyboards.escapeKey = true;

  await ctx.reply(messages.weather, keyboards.weather);
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the weather scene');

  const keyboards = new Keyboards(ctx);
  const messages = new Messages(ctx);

  await ctx.reply(messages.mainMenu, keyboards.main);
});

scene.hears(
  match('weather.morning'),
  asyncWrapper(async (ctx) => {
    const messages = new Messages(ctx);

    await ctx.reply(messages.workInProgress);
  })
);

scene.hears(
  match('weather.day'),
  asyncWrapper(async (ctx) => {
    const messages = new Messages(ctx);

    await ctx.reply(messages.workInProgress);
  })
);

scene.hears(
  match('weather.evening'),
  asyncWrapper(async (ctx) => {
    const messages = new Messages(ctx);

    await ctx.reply(messages.workInProgress);
  })
);

scene.hears(
  match('weather.night'),
  asyncWrapper(async (ctx) => {
    const messages = new Messages(ctx);

    await ctx.reply(messages.workInProgress);
  })
);

scene.hears(match('navigation.back'), leave());

module.exports = { weather: scene };
