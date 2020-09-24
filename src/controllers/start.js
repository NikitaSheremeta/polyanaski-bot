const { match } = require('telegraf-i18n');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const Keyboard = require('../helpers/keyboard');
const { logger } = require('../util/logger');

const DELAY = 1600;

const { leave } = Stage;
const scene = new Scene('start');

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters start scene');

  const keyboard = new Keyboard(ctx);
  const messages = {
    greeting: ctx.i18n.t('scenes.start.greeting'),
    description: ctx.i18n.t('scenes.start.description')
  };

  await ctx.reply(messages.greeting).then(() => {
    setTimeout(() => ctx.reply(messages.description, keyboard.launch()), DELAY);
  });
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the start scene');

  const keyboard = new Keyboard(ctx);
  const messages = { go: ctx.i18n.t('shared.go') };

  await ctx.reply(messages.go, keyboard.main());
});

scene.hears(match('shared.launch'), leave());

module.exports = { start: scene };
