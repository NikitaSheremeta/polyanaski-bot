const fs = require('fs');
const path = require('path');

const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const { match } = require('telegraf-i18n');

const Messages = require('../helpers/messages');
const Keyboards = require('../helpers/keyboards');

const { logger } = require('../util/logger');
const { asyncWrapper } = require('../util/error-handler');

const { leave } = Stage;
const scene = new Scene('trail-maps');

const IMAGES_DIR = path.join(__dirname, '..', 'assets', 'images');

const TRAIL_MAPS = {
  mainMap: {
    filename: 'main-map.jpg',
    source: fs.readFileSync(
      path.join(IMAGES_DIR, 'main-map.jpg')
    ),
    sourcePreview: fs.readFileSync(
      path.join(IMAGES_DIR, 'main-map-preview.jpg')
    )
  },
  krasnayaPolyana: {
    filename: 'krasnaya-polyana-map.jpg',
    source: fs.readFileSync(
      path.join(IMAGES_DIR, 'krasnaya-polyana-map.jpg')
    ),
    sourcePreview: fs.readFileSync(
      path.join(IMAGES_DIR, 'krasnaya-polyana-map-preview.jpg')
    )
  },
  rosaKhutor: {
    filename: 'rosa-khutor-map.jpg',
    source: fs.readFileSync(
      path.join(IMAGES_DIR, 'rosa-khutor-map.jpg')
    ),
    sourcePreview: fs.readFileSync(
      path.join(IMAGES_DIR, 'rosa-khutor-map-preview.jpg')
    )
  },
  gazprom: {
    filename: 'gazprom-map.jpg',
    source: fs.readFileSync(
      path.join(IMAGES_DIR, 'gazprom-map.jpg')
    ),
    sourcePreview: fs.readFileSync(
      path.join(IMAGES_DIR, 'gazprom-map-preview.jpg')
    )
  }
};

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
    try {
      await ctx.replyWithPhoto({
        source: TRAIL_MAPS.mainMap.sourcePreview
      });
    } catch (error) {
      logger.debug(ctx, error);
    }
  })
);

scene.hears(
  match('resorts.krasnayaPolyana'),
  asyncWrapper(async (ctx) => {
    try {
      await ctx.replyWithPhoto({
        source: TRAIL_MAPS.krasnayaPolyana.sourcePreview
      });
    } catch (error) {
      logger.debug(ctx, error);
    }
  })
);

scene.hears(
  match('resorts.rosaKhutor'),
  asyncWrapper(async (ctx) => {
    try {
      await ctx.replyWithPhoto({
        source: TRAIL_MAPS.rosaKhutor.sourcePreview
      });
    } catch (error) {
      logger.debug(ctx, error);
    }
  })
);

scene.hears(
  match('resorts.gazprom'),
  asyncWrapper(async (ctx) => {
    try {
      await ctx.replyWithPhoto({
        source: TRAIL_MAPS.gazprom.sourcePreview
      });
    } catch (error) {
      logger.debug(ctx, error);
    }
  })
);

scene.hears(match('navigation.back'), leave());

module.exports = { trailMaps: scene };
