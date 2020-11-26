const path = require('path');

const { logger } = require('../util/logger');

const IMAGES_DIR = path.join(__dirname, '..', 'assets', 'images');

const TRAIL_MAPS = {
  mainMap: {
    filename: 'main-map.jpg',
    source: path.join(IMAGES_DIR, 'main-map.jpg'),
    sourcePreview: path.join(IMAGES_DIR, 'main-map-preview.jpg')
  },
  krasnayaPolyana: {
    filename: 'krasnaya-polyana-map.jpg',
    source: path.join(IMAGES_DIR, 'krasnaya-polyana-map.jpg'),
    sourcePreview: path.join(IMAGES_DIR, 'krasnaya-polyana-map-preview.jpg')
  },
  rosaKhutor: {
    filename: 'rosa-khutor-map.jpg',
    source: path.join(IMAGES_DIR, 'rosa-khutor-map.jpg'),
    sourcePreview: path.join(IMAGES_DIR, 'rosa-khutor-map-preview.jpg')
  },
  gazprom: {
    filename: 'gazprom-map.jpg',
    source: path.join(IMAGES_DIR, 'gazprom-map.jpg'),
    sourcePreview: path.join(IMAGES_DIR, 'gazprom-map-preview.jpg')
  }
};

async function downloadMap(ctx, filename) {
  let source = String;

  switch (filename) {
    case TRAIL_MAPS.mainMap.filename:
      source = TRAIL_MAPS.mainMap.source;
      break;
    case TRAIL_MAPS.krasnayaPolyana.filename:
      source = TRAIL_MAPS.krasnayaPolyana.source;
      break;
    case TRAIL_MAPS.rosaKhutor.filename:
      source = TRAIL_MAPS.rosaKhutor.source;
      break;
    case TRAIL_MAPS.gazprom.filename:
      source = TRAIL_MAPS.gazprom.source;
      break;
  }

  try {
    ctx.reply(ctx.i18n.t('util.loading'));
    ctx.replyWithDocument({ source, filename });
  } catch (error) {
    logger.debug(ctx, error);
  }
}

module.exports = { downloadMap, TRAIL_MAPS };
