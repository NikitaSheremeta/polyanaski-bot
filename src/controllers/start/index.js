const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');

const { getMainMenu } = require('../../util/keyboards');

const { leave } = Stage;

const start = new Scene('start');

start.enter((ctx) => {
  const { mainMenu } = getMainMenu(ctx);

  const message = ctx.i18n.t('scenes.start.greeting');

  return ctx.reply(message, mainMenu);
});

start.leave((ctx) => ctx.reply('Bye!'));

start.hears(/hi/gi, leave());

module.exports = { start };
