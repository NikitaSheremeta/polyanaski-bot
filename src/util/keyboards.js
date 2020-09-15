const Markup = require('telegraf/markup');

const getStartMenu = (ctx) => {
  const buttons = { start: ctx.i18n.t('keyboards.start-menu.start') };

  let startMenu = Markup.keyboard([buttons.start]);

  startMenu = startMenu.resize().extra();

  return { startMenu };
};

const getMainMenu = (ctx) => {
  const buttons = {
    about: ctx.i18n.t('keyboards.main-menu.about'),
    journey: ctx.i18n.t('keyboards.main-menu.journey'),
    hotels: ctx.i18n.t('keyboards.main-menu.hotels'),
    riding: ctx.i18n.t('keyboards.main-menu.riding'),
    rent: ctx.i18n.t('keyboards.main-menu.rent'),
    instructors: ctx.i18n.t('keyboards.main-menu.instructors'),
    freeride: ctx.i18n.t('keyboards.main-menu.freeride'),
    contacts: ctx.i18n.t('keyboards.main-menu.contacts')
  };

  let mainMenu = Markup.keyboard([
    [buttons.about, buttons.journey],
    [buttons.hotels, buttons.riding],
    [buttons.rent, buttons.instructors],
    [buttons.freeride, buttons.contacts]
  ]);

  mainMenu = mainMenu.resize().extra();

  return { mainMenu };
};

module.exports = { getStartMenu, getMainMenu };
