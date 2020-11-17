const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const { match } = require('telegraf-i18n');

const Messages = require('../helpers/messages');
const Keyboards = require('../helpers/keyboards');
const InlineKeyboards = require('../helpers/inline-keyboards');

const { logger } = require('../util/logger');
const { asyncWrapper } = require('../util/error-handler');

const Articles = require('../models/articles');

const { leave } = Stage;
const scene = new Scene('instructors');

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters the instructors scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  keyboards.escapeKey = true;

  try {
    await ctx.reply(messages.instructors, keyboards.trains);
  } catch (error) {
    logger.debug(ctx, error);
  }
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the instructors scene');

  const backKey = ctx.i18n.t('navigation.back');

  // If you exit the scene through the "back" button, then we issue a message about the main menu
  if (ctx.update.message.text === backKey) {
    const messages = new Messages(ctx);
    const keyboards = new Keyboards(ctx);

    keyboards.extraMarkdown = true;

    try {
      await ctx.reply(messages.mainMenu, keyboards.main);
    } catch (error) {
      logger.debug(ctx, error);
    }
  }
});

scene.hears(
  match('scenes.instructors.individualAndGroup'),
  asyncWrapper(async (ctx) => {
    const article = await Articles.findById(process.env.TRAINS_ID);

    const inlineKeyboards = new InlineKeyboards(ctx);

    inlineKeyboards.extraMarkdown = true;

    const message = `[${article.title}](${article.link})`;

    const label = ctx.i18n.t('util.bookAnInstructor');

    try {
      await ctx.reply(message, inlineKeyboards.booking(label));
    } catch (error) {
      logger.debug(ctx, error);
    }
  })
);

scene.hears(
  match('scenes.instructors.childrensSchool'),
  asyncWrapper(async (ctx) => await ctx.scene.enter('childrens-school'))
);

scene.hears(
  match('scenes.instructors.freeride'),
  asyncWrapper(async (ctx) => await ctx.scene.enter('freeride'))
);

scene.hears(match('navigation.back'), leave());

module.exports = { instructors: scene };
