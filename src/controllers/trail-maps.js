const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const { match } = require('telegraf-i18n');

const Messages = require('../helpers/messages');
const Keyboards = require('../helpers/keyboards');

const { logger } = require('../util/logger');
const { asyncWrapper } = require('../util/error-handler');

// This is a temporary solution, pending a working solution
const fs = require('fs');
const path = require('path');

const { leave } = Stage;
const scene = new Scene('trail-maps');

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters the trail maps scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  keyboards.mainMapKey = true;
  keyboards.escapeKey = true;

  try {
    await ctx.reply(messages.trailMaps, keyboards.resorts);
  } catch (error) {
    logger.debug(ctx, error);
  }
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the trail maps scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  keyboards.extraMarkdown = true;

  try {
    await ctx.reply(messages.mainMenu, keyboards.main);
  } catch (error) {
    logger.debug(ctx, error);
  }
});

scene.hears(
  match('util.mainMap'),
  asyncWrapper(async (ctx) => {
    const messages = new Messages(ctx);

    try {
      await ctx.reply(messages.workInProgress);
    } catch (error) {
      logger.debug(ctx, error);
    }
  })
);

scene.hears(
  match('resorts.krasnayaPolyana'),
  asyncWrapper(async (ctx) => {
    const messages = new Messages(ctx);

    try {
      await ctx.reply(messages.workInProgress);
    } catch (error) {
      logger.debug(ctx, error);
    }
  })
);

scene.hears(
  match('resorts.rosaKhutor'),
  asyncWrapper(async (ctx) => {
    const messages = new Messages(ctx);

    try {
      await ctx.reply(messages.workInProgress);
    } catch (error) {
      logger.debug(ctx, error);
    }
  })
);

// [WIP]: This is a temporary solution for testing functionality, pending a working solution.
scene.hears(
  match('resorts.gazprom'),
  (ctx) => ctx.replyWithDocument({
    source: fs.readFileSync(
      path.join(__dirname, '..', 'assets', 'images', 'gazprom-map.jpg')
    ),
    filename: 'gazprom-map.jpg'
  })
);

scene.hears(match('navigation.back'), leave());

module.exports = { trailMaps: scene };
