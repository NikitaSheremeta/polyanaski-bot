const Markup = require('telegraf/markup');

const getStartKeyboard = (ctx) => {
  const buttons = { start: ctx.i18n.t('keyboards.start-menu.start') };

  let keyboard = Markup.keyboard([buttons.start]);

  keyboard = keyboard.resize().extra();

  return { keyboard };
};

const getMainKeyboard = (ctx) => {
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

  let keyboard = Markup.keyboard([
    [buttons.about, buttons.hotels],
    [buttons.riding, buttons.rent],
    [buttons.instructors, buttons.freeride],
    [buttons.contacts]
  ]);

  keyboard = keyboard.resize().extra();

  return { keyboard };
};

const getBackKeyboard = (ctx) => {
  const buttons = { back: ctx.i18n.t('keyboards.navigation.back') };

  let keyboard = Markup.keyboard([buttons.back]);

  keyboard = keyboard.resize().extra();

  return { keyboard };
};

module.exports = { getStartKeyboard, getMainKeyboard, getBackKeyboard };
