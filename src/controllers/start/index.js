const { match } = require('telegraf-i18n');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');

const { getStartKeyboard, getMainKeyboard } = require('../../util/keyboards');

const REPLY_INTERVAL = 1600;

const { leave } = Stage;

const start = new Scene('start');

start.enter((ctx) => {
  const { keyboard } = getStartKeyboard(ctx);

  const messages = {
    greeting: ctx.i18n.t('scenes.start.greeting'),
    description: ctx.i18n.t('scenes.start.description')
  };

  ctx.reply(messages.greeting);

  setTimeout(() => ctx.reply(messages.description, keyboard), REPLY_INTERVAL);
});

start.leave((ctx) => {
  const { keyboard } = getMainKeyboard(ctx);

  const messages = { go: ctx.i18n.t('shared.go') };

  ctx.reply(messages.go, keyboard);
});

start.hears(match('keyboards.start-menu.start'), leave());

module.exports = { start };
