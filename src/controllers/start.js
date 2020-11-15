const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const { match } = require('telegraf-i18n');

const Keyboards = require('../helpers/keyboards');
const Messages = require('../helpers/messages');

const { logger } = require('../util/logger');

const Users = require('../models/users');

const { leave } = Stage;
const scene = new Scene('start');

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters the start scene');

  const keyboards = new Keyboards(ctx);
  const messages = new Messages(ctx);

  /**
   * Arguing on the topic, does it make sense to leave the authorization code
   * in the controller or still move it to the new "actions" directory.
   */
  const userID = String(ctx.from.id);

  const user = await Users.findById(userID);

  if (user) {
    logger.debug(ctx, messages.welcomeBack);
  } else {
    const MESSAGE_INTERVAL = 1600;

    const userData = {
      _id: userID,
      created: new Date().getTime(),
      username: ctx.from.username,
      name: `${ctx.from.first_name} ${ctx.from.last_name}`,
      language: ctx.i18n.languageCode
    };

    const newUser = new Users(userData);

    try {

      await newUser.save().then(() => {
        logger.debug(ctx, 'New user has been created');
      });

    } catch (error) {

      logger.debug(ctx, 'New user has NOT been created');

    }

    await ctx.reply(messages.greeting).then(() => {
      setTimeout(() => ctx.reply(
        messages.description,
        keyboards.launch
      ), MESSAGE_INTERVAL);
    });
  }
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the start scene');

  const keyboards = new Keyboards(ctx);
  const messages = new Messages(ctx);

  await ctx.reply(messages.go, keyboards.main);
});

scene.hears(match('shared.launch'), leave());

module.exports = { start: scene };
