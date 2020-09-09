const { Markup } = require('telegraf');

const getMenuKeyboard = (ctx) => {
  const one = ctx.i18n.t('keyboards.menu.one');
  const two = ctx.i18n.t('keyboards.menu.two');
  const three = ctx.i18n.t('keyboards.menu.three');

  let menuKeyboard = Markup.keyboard([one, two, three]);

  menuKeyboard = menuKeyboard.resize().extra();

  return { menuKeyboard };
};

module.exports = { getMenuKeyboard };
