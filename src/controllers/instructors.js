const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const Extra = require('telegraf/extra');
const { match } = require('telegraf-i18n');
const Messages = require('../helpers/messages');
const Keyboards = require('../helpers/keyboards');
const Buttons = require('../helpers/buttons');
const { logger } = require('../util/logger');

const { leave } = Stage;
const scene = new Scene('instructors');
const markup = Extra.markdown();

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters the instructors scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  keyboards.escapeKey = true;

  await ctx.reply(messages.instructors, keyboards.trains);
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the instructors scene');

  const buttons = new Buttons(ctx);

  if (ctx.update.message.text === buttons.back) {
    const messages = new Messages(ctx);
    const keyboards = new Keyboards(ctx);

    keyboards.extraMarkdown = true;

    await ctx.reply(messages.mainMenu, keyboards.main);
  }
});

scene.hears(match('training.individualAndGroup'), async (ctx) => {
  await ctx.reply(
    '[Инструктор по горным лыжам / сноуборду](https://telegra.ph/Individualnye-i-gruppovye-zanyatiya-10-27)',
    markup
  );
});

scene.hears(
  match('categories.childrensSchool'),
  async (ctx) => {
    leave();

    await ctx.scene.enter('childrens-school');
  }
);

scene.hears(match('navigation.back'), leave());

module.exports = { instructors: scene };
