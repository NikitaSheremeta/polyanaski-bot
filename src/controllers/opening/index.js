const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');

const { getMenuKeyboard } = require('../../util/keyboards');

const { leave } = Stage;

const opening = new Scene('opening');

opening.enter((ctx) => {
  const { menuKeyboard } = getMenuKeyboard(ctx);

  const message = ctx.i18n.t('scenes.opening.welcome');

  return ctx.reply(message, menuKeyboard);
});

opening.leave((ctx) => ctx.reply('Bye!'));

opening.hears(/hi/gi, leave());

module.exports.opening = opening;
