const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const Extra = require('telegraf/extra');
const { match } = require('telegraf-i18n');

const Messages = require('../helpers/messages');
const Keyboards = require('../helpers/keyboards');
const Buttons = require('../helpers/buttons');

const { logger } = require('../util/logger');
const { asyncWrapper } = require('../util/error-handler');

const Articles = require('../models/articles');

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

  // If you exit the scene through the "back" button, then we issue a message about the main menu
  if (ctx.update.message.text === buttons.back) {
    const messages = new Messages(ctx);
    const keyboards = new Keyboards(ctx);

    keyboards.extraMarkdown = true;

    await ctx.reply(messages.mainMenu, keyboards.main);
  }
});

scene.hears(
  match('training.individualAndGroup'),
  asyncWrapper(async (ctx) => {
    const article = await Articles.findById(process.env.TRAINS_ID);

    const message = `[${article.title}](${article.link})`;

    await ctx.reply(message, markup);
  })
);

scene.hears(
  match('categories.childrensSchool'),
  asyncWrapper(async (ctx) => await ctx.scene.enter('childrens-school')),
  leave()
);

scene.hears(
  match('categories.freeride'),
  asyncWrapper(async (ctx) => await ctx.scene.enter('freeride')),
  leave()
);

scene.hears(match('navigation.back'), leave());

module.exports = { instructors: scene };
