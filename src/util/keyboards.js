const { Markup } = require('telegraf');

const getMenuKeyboard = (ctx) => {
  const one = ctx.i18n.t('keyboards.menu.one');
  const two = ctx.i18n.t('keyboards.menu.two');
  const three = ctx.i18n.t('keyboards.menu.three');
  const four = ctx.i18n.t('keyboards.menu.four');
  const five = ctx.i18n.t('keyboards.menu.five');
  const six = ctx.i18n.t('keyboards.menu.six');

  let menuKeyboard = Markup.keyboard([
    [one, two, three],
    [four, five, six]
  ]);

  menuKeyboard = menuKeyboard.resize().extra();

  return { menuKeyboard };
};

module.exports.getMenuKeyboard = getMenuKeyboard;
