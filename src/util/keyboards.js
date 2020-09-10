const { Markup } = require('telegraf');

const getMainMenu = (ctx) => {
  const about = ctx.i18n.t('keyboards.main-menu.about');
  const journey = ctx.i18n.t('keyboards.main-menu.journey');
  const hotels = ctx.i18n.t('keyboards.main-menu.hotels');
  const riding = ctx.i18n.t('keyboards.main-menu.riding');
  const rent = ctx.i18n.t('keyboards.main-menu.rent');
  const instructors = ctx.i18n.t('keyboards.main-menu.instructors');
  const freeride = ctx.i18n.t('keyboards.main-menu.freeride');
  const contacts = ctx.i18n.t('keyboards.main-menu.contacts');

  let mainMenu = Markup.keyboard([
    [about, journey],
    [hotels, riding],
    [rent, instructors],
    [freeride, contacts]
  ]);

  mainMenu = mainMenu.resize().extra();

  return { mainMenu };
};

module.exports = { getMainMenu };
