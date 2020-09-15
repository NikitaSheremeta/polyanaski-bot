const { match } = require('telegraf-i18n');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');

const { getStartMenu, getMainMenu } = require('../../util/keyboards');

const { leave } = Stage;

const REPLY_INTERVAL = 1600;

const start = new Scene('start');

start.enter((ctx) => {
  const { startMenu } = getStartMenu(ctx);

  const messages = {
    greeting: ctx.i18n.t('scenes.start.greeting'),
    description: ctx.i18n.t('scenes.start.description')
  };

  ctx.reply(messages.greeting);

  setTimeout(() => ctx.reply(messages.description, startMenu), REPLY_INTERVAL);
});

start.leave((ctx) => {
  const { mainMenu } = getMainMenu(ctx);

  const messages = { go: ctx.i18n.t('shared.go') };

  ctx.reply(messages.go, mainMenu);
});

start.hears(match('keyboards.start-menu.start'), leave());

module.exports = { start };
