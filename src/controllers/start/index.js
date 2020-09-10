const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');

const { getMainMenu } = require('../../util/keyboards');

const { leave } = Stage;

const start = new Scene('start');

start.enter((ctx) => {
  const { mainMenu } = getMainMenu(ctx);

  const messages = {
    greeting: ctx.i18n.t('scenes.start.greeting'),
    description: ctx.i18n.t('scenes.start.description')
  };

  ctx.reply(messages.greeting);

  ctx.reply(messages.description, mainMenu);
});

start.leave((ctx) => ctx.reply('Bye!'));

start.hears(/hi/gi, leave());

module.exports = { start };
