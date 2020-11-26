const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const { match } = require('telegraf-i18n');

const Messages = require('../helpers/messages');
const Keyboards = require('../helpers/keyboards');
const InlineKeyboards = require('../helpers/inline-keyboards');

const { logger } = require('../util/logger');
const { asyncWrapper } = require('../util/error-handler');

const { downloadMap, TRAIL_MAPS } = require('../actions/download-map');

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
    const inlineKeyboards = new InlineKeyboards(ctx);

    try {
      await ctx.replyWithPhoto(
        {
          source: TRAIL_MAPS.mainMap.sourcePreview
        },
        inlineKeyboards.downloadMap(TRAIL_MAPS.mainMap.filename)
      );
    } catch (error) {
      logger.debug(ctx, error);
    }
  })
);

scene.hears(
  match('resorts.krasnayaPolyana'),
  asyncWrapper(async (ctx) => {
    const inlineKeyboards = new InlineKeyboards(ctx);

    try {
      await ctx.replyWithPhoto(
        {
          source: TRAIL_MAPS.krasnayaPolyana.sourcePreview
        },
        inlineKeyboards.downloadMap(TRAIL_MAPS.krasnayaPolyana.filename)
      );
    } catch (error) {
      logger.debug(ctx, error);
    }
  })
);

scene.hears(
  match('resorts.rosaKhutor'),
  asyncWrapper(async (ctx) => {
    const inlineKeyboards = new InlineKeyboards(ctx);

    try {
      await ctx.replyWithPhoto(
        {
          source: TRAIL_MAPS.rosaKhutor.sourcePreview
        },
        inlineKeyboards.downloadMap(TRAIL_MAPS.rosaKhutor.filename)
      );
    } catch (error) {
      logger.debug(ctx, error);
    }
  })
);

scene.hears(
  match('resorts.gazprom'),
  asyncWrapper(async (ctx) => {
    const inlineKeyboards = new InlineKeyboards(ctx);

    try {
      await ctx.replyWithPhoto(
        {
          source: TRAIL_MAPS.gazprom.sourcePreview
        },
        inlineKeyboards.downloadMap(TRAIL_MAPS.gazprom.filename)
      );
    } catch (error) {
      logger.debug(ctx, error);
    }
  })
);

scene.on(
  'callback_query',
  asyncWrapper(async (ctx) => downloadMap(ctx, ctx.update.callback_query.data))
);

scene.hears(match('navigation.back'), leave());

module.exports = { trailMaps: scene };
