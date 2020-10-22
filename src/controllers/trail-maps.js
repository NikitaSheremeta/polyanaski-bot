const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const { match } = require('telegraf-i18n');
const Messages = require('../helpers/messages');
const Keyboards = require('../helpers/keyboards');
const { logger } = require('../util/logger');

// This is a temporary solution, pending a working solution
const fs = require('fs');
const path = require('path');

const { leave } = Stage;
const scene = new Scene('trail-maps');

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters trail maps scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  keyboards.mainMapKey = true;
  keyboards.escapeKey = true;

  await ctx.reply(messages.trailMaps, keyboards.resorts);
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the trail maps scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  keyboards.extraMarkdown = true;

  await ctx.reply(messages.mainMenu, keyboards.main);
});

// This is a temporary solution, pending a working solution
scene.hears(match('util.mainMap'), (ctx) => ctx.replyWithPhoto({
  url: 'https://riderhelp.ru/shared/files/202001/1_23732.jpg'
}));

scene.hears(match('resorts.gazprom'), (ctx) => ctx.replyWithDocument({
  source: fs.readFileSync(path.join(__dirname, '..', 'assets', 'images', 'gazprom-map.jpg')),
  filename: 'Карта Газпрома'
}));

scene.hears(match('navigation.back'), leave());

module.exports = { trailMaps: scene };
