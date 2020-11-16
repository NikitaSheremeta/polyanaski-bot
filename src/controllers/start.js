const Scene = require('telegraf/scenes/base');

const Messages = require('../helpers/messages');
const Keyboards = require('../helpers/keyboards');

const { logger } = require('../util/logger');

const Users = require('../models/users');

const scene = new Scene('start');

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters the start scene');

  const messages = new Messages(ctx);

  const userID = String(ctx.from.id);

  const user = await Users.findById(userID);

  if (user) {
    logger.debug(ctx, 'Welcome back!');

    await ctx.reply(messages.welcomeBack);

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

  try {
    await newUser.save()
      .then(() => logger.debug(ctx, 'New user has been created'));
  } catch (error) {
    logger.debug(ctx, 'New user has NOT been created');
  }

  await ctx.reply(messages.greeting);

  return await ctx.scene.leave();
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the start scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  await ctx.reply(messages.description, keyboards.main);
});

module.exports = { start: scene };
