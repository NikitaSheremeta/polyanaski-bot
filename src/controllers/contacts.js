const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const { match } = require('telegraf-i18n');
const Contacts = require('../models/contacts');
const Keyboards = require('../helpers/keyboards');
const Messages = require('../helpers/messages');
const { logger } = require('../util/logger');

const { leave } = Stage;
const scene = new Scene('contacts');
const contacts = new Contacts();

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters contact scene');

  const message = await contacts.toMessage();
  const keyboards = new Keyboards(ctx, true);

  await ctx.reply(message, keyboards.back);
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the contact scene');

  const messages = new Messages(ctx);
  const keyboards = new Keyboards(ctx);

  await ctx.reply(messages.mainMenu, keyboards.main);
});

scene.hears(match('navigation.back'), leave());

module.exports = { contacts: scene };
