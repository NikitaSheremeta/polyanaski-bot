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
  match('weather.forADay'),
  asyncWrapper(async (ctx) => {
    const forecast = new Forecast(ctx, FOR_A_DAY);

    const message = await forecast.getMessage();

    await ctx.replyWithHTML(message);
  })
);

scene.hears(
  match('weather.forAWeak'),
  asyncWrapper(async (ctx) => {
    const forecast = new Forecast(ctx, FOR_A_WEAK);

    const message = await forecast.getMessage();

    await ctx.replyWithHTML(message);
  })
);

scene.hears(match('navigation.back'), leave());

module.exports = { weather: scene };
