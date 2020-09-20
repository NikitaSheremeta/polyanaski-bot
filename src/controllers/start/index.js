const { match } = require('telegraf-i18n');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const Keyboards = require('../../helpers/keyboards');

const REPLY_DELAY = 1600;

const { leave } = Stage;
const scene = new Scene('start');

scene.enter(async (ctx) => {
  const keyboards = new Keyboards(ctx);
  const messages = {
    greeting: ctx.i18n.t('scenes.start.greeting'),
    description: ctx.i18n.t('scenes.start.description')
  };
  await ctx.reply(messages.greeting).then(() => {
    setTimeout(() => {
      ctx.reply(messages.description, keyboards.launch());
    }, REPLY_DELAY);
  });
});

scene.leave(async (ctx) => {
  const keyboards = new Keyboards(ctx);
  const messages = { go: ctx.i18n.t('shared.go') };
  await ctx.reply(messages.go, keyboards.main());
});

scene.hears(match('keyboards.launch'), leave());

module.exports = { start: scene };
