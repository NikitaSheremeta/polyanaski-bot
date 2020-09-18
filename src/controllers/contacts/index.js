const { match } = require('telegraf-i18n');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');

const Contacts = require('../../models/contacts/index');

const { getMainKeyboard, getBackKeyboard } = require('../../util/keyboards');

const { leave } = Stage;

const contacts = new Scene('contacts');

// Выносим в модель и накидываем на конструктор
const toMessage = async () => {
  const data = await Contacts.getData();

  let message = [];

  for (const key in data) {
    const value = Object.values(data[key]);

    if (value.length) message.push(...value);
  }

  message = message.join('\n\n');

  return message;
};

contacts.enter(async (ctx) => {
  const message = await toMessage();

  const { keyboard } = getBackKeyboard(ctx);

  await ctx.reply(message, keyboard);
});

contacts.leave(async (ctx) => {
  const { keyboard } = getMainKeyboard(ctx);

  await ctx.reply('Выход из контактной сцены', keyboard);
});

contacts.hears(match('keyboards.navigation.back'), leave());

module.exports = { contacts };
