const { match } = require('telegraf-i18n');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const Contacts = require('../../models/contacts/index');
const { getMainKeyboard, getBackKeyboard } = require('../../util/keyboards');

const { leave } = Stage;
const scene = new Scene('contacts');
const contacts = new Contacts();

scene.enter(async (ctx) => {
  const message = await contacts.toMessage();
  const { keyboard } = getBackKeyboard(ctx);
  await ctx.reply(message, keyboard);
});

scene.leave(async (ctx) => {
  const { keyboard } = getMainKeyboard(ctx);
  await ctx.reply('Выход из контактной сцены', keyboard);
});

scene.hears(match('keyboards.navigation.back'), leave());

module.exports = { contacts: scene };
