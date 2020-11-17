const Scene = require('telegraf/scenes/base');

const Messages = require('../helpers/messages');
const Keyboards = require('../helpers/keyboards');

const { logger } = require('../util/logger');

const Users = require('../models/users');

const { addNewUser } = require('../actions/add-user');

const scene = new Scene('start');

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters the start scene');

  const messages = new Messages(ctx);

  const userID = String(ctx.from.id);

  const user = await Users.findById(userID);

  if (user) {
    logger.debug(ctx, 'Welcome back!');

    try {
      await ctx.reply(messages.welcomeBack);
    } catch (error) {
      logger.debug(ctx, error);
    }

    return await ctx.scene.leave();
  }

  // Add a new user to the database
  await addNewUser(userID, ctx);

  try {
    await ctx.reply(messages.greeting);
  } catch (error) {
    logger.debug(ctx, error);
  }

  return await ctx.scene.leave();
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the start scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  try {
    await ctx.reply(messages.description, keyboards.main);
  } catch (error) {
    logger.debug(ctx, error);
  }
});

module.exports = { start: scene };
