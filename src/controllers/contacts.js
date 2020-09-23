const { match } = require('telegraf-i18n');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const Contacts = require('../models/contacts');
const Keyboard = require('../helpers/keyboard');
const { logger } = require('../util/logger');

const { leave } = Stage;
const scene = new Scene('contacts');
const contacts = new Contacts();

scene.enter(async (ctx) => {
  logger.debug(ctx, 'Enters contact scene');

  const message = await contacts.toMessage();
  const keyboard = new Keyboard(ctx, true);

  await ctx.reply(message, keyboard.navigation('back'));
});

scene.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves the contact scene');

  const messages = { mainMenu: ctx.i18n.t('shared.main-menu') };
  const keyboard = new Keyboard(ctx);

  await ctx.reply(messages.mainMenu, keyboard.main());
});

scene.hears(match('keyboards.navigation.back'), leave());

module.exports = { contacts: scene };
