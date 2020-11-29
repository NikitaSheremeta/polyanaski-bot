const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const { match } = require('telegraf-i18n');

const Messages = require('../helpers/messages');
const Keyboards = require('../helpers/keyboards');

const { logger } = require('../util/logger');
const { asyncWrapper } = require('../util/error-handler');

const Forecast = require('../middleware/forecast');

const FOR_A_DAY = 1;
const FOR_A_WEAK = 7;

const { leave } = Stage;
const scene = new Scene('forecast');

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters the forecast scene');

  const keyboards = new Keyboards(ctx);
  const messages = new Messages(ctx);

  keyboards.escapeKey = true;

  try {
    await ctx.reply(messages.forecast, keyboards.forecast);
  } catch (error) {
    logger.debug(ctx, error);
  }
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the forecast scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  try {
    await ctx.reply(messages.mainMenu, keyboards.main);
  } catch (error) {
    logger.debug(ctx, error);
  }
});

scene.hears(
  match('scenes.forecast.forADay'),
  asyncWrapper(async (ctx) => {
    const forecast = new Forecast(ctx, FOR_A_DAY);

    const message = await forecast.getMessage();

    try {
      await ctx.replyWithHTML(message);
    } catch (error) {
      logger.debug(ctx, error);
    }
  })
);

scene.hears(
  match('scenes.forecast.forAWeak'),
  asyncWrapper(async (ctx) => {
    const forecast = new Forecast(ctx, FOR_A_WEAK);

    const message = await forecast.getMessage();

    try {
      await ctx.replyWithHTML(message);
    } catch (error) {
      logger.debug(ctx, error);
    }
  })
);

scene.hears(match('navigation.back'), leave());

module.exports = { forecast: scene };
