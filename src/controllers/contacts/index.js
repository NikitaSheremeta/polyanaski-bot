const { match } = require('telegraf-i18n');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const Contacts = require('../../models/contacts/index');
const Keyboards = require('../../helpers/keyboards');

const { leave } = Stage;
const scene = new Scene('contacts');
const contacts = new Contacts();

scene.enter(async (ctx) => {
  const message = await contacts.toMessage();
  const keyboard = new Keyboards(ctx, true);
  await ctx.reply(message, keyboard.navigation('back'));
});

scene.leave(async (ctx) => {
  const keyboard = new Keyboards(ctx);
  await ctx.reply('Выход из контактной сцены', keyboard.main());
});

scene.hears(match('keyboards.navigation.back'), leave());

module.exports = { contacts: scene };
