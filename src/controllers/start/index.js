const { Extra, Markup } = require('telegraf');
const Scene = require('telegraf/scenes/base');

const { getStartMenu } = require('../../util/keyboards');

const start = new Scene('start');

start.enter((ctx) => {
  const { startMenu } = getStartMenu(ctx);

  const messages = {
    greeting: ctx.i18n.t('scenes.start.greeting'),
    description: ctx.i18n.t('scenes.start.description')
  };

  ctx.reply(messages.greeting);

  ctx.reply(messages.description, startMenu);
});

start.leave((ctx) => {
  ctx.reply('Выход из сценария', Extra.markup(Markup.removeKeyboard()));
});

start.hears(/инфо/gi, (ctx) => ctx.reply('Стартовая сцена'));
start.hears(/понятно/gi, (ctx) => ctx.scene.leave(ctx));

module.exports = { start };
