const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const Extra = require('telegraf/extra');
const { match } = require('telegraf-i18n');

const Messages = require('../helpers/messages');
const Keyboards = require('../helpers/keyboards');

const { logger } = require('../util/logger');
const { asyncWrapper } = require('../util/error-handler');

const Articles = require('../models/articles');

const { leave } = Stage;
const scene = new Scene('freeride');
const markup = Extra.markdown();

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters the freeride scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  keyboards.escapeKey = true;

  await ctx.reply(messages.freeride, keyboards.freeride);
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the freeride scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  keyboards.extraMarkdown = true;

  await ctx.reply(messages.mainMenu, keyboards.main);
});

scene.hears(
  match('resorts.krasnayaPolyana'),
  asyncWrapper(async (ctx) => {
    const postID = '5f9a9045d52c9109ccb792f7';

    const article = await Articles.findById(postID);

    const message = `[${article.title}](${article.link})`;

    await ctx.reply(message, markup);
  })
);

scene.hears(
  match('util.abkhazia'),
  asyncWrapper(async (ctx) => {
    // const postID = '';

    // const article = await Articles.findById(postID);

    // const message = `[${article.title}](${article.link})`;

    await ctx.reply('abkhazia freeride', markup);
  })
);

scene.hears(match('navigation.back'), leave());

module.exports = { freeride: scene };
