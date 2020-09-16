const { match } = require('telegraf-i18n');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');

const Contacts = require('../../models/contacts/index');

const { getMainKeyboard, getBackKeyboard } = require('../../util/keyboards');

const { leave } = Stage;

const contacts = new Scene('contacts');

contacts.enter(async (ctx) => {
  const data = await Contacts.getData();

  const { keyboard } = getBackKeyboard(ctx);

  ctx.reply(data, keyboard);
});

contacts.leave((ctx) => {
  const { keyboard } = getMainKeyboard(ctx);

  ctx.reply('Выход из контактной сцены', keyboard);
});

contacts.hears(match('keyboards.navigation.back'), leave());

module.exports = { contacts };
