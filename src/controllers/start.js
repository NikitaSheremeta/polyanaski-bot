const Scene = require('telegraf/scenes/base');

const Messages = require('../helpers/messages');
const Keyboards = require('../helpers/keyboards');

const { logger } = require('../util/logger');

const Users = require('../models/users');

const scene = new Scene('start');

// eslint-disable-next-line max-statements
scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters the start scene');

  const messages = new Messages(ctx);

  const userID = String(ctx.from.id);

  const user = await Users.findById(userID);

  if (user) {
    logger.debug(ctx, 'Welcome back!');

    await ctx.reply(messages.welcomeBacks)
      .catch((error) => logger.debug(ctx, error));

    return await ctx.scene.leave();
  }

  const userData = {
    _id: userID,
    created: new Date().getTime(),
    username: ctx.from.username,
    name: `${ctx.from.first_name} ${ctx.from.last_name}`,
    language: ctx.i18n.languageCode
  };

  const newUser = new Users(userData);

  await newUser.save()
    .then(() => logger.debug(ctx, 'New user has been created'))
    .catch((error) => logger.debug(ctx, error));

  await ctx.reply(messages.greeting)
    .catch((error) => logger.debug(ctx, error));

  return await ctx.scene.leave();
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the start scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  await ctx.reply(messages.description, keyboards.main)
    .catch((error) => logger.debug(ctx, error));
});

module.exports = { start: scene };
