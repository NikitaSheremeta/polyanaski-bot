const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

class Keyboard {
  constructor(ctx, markdown = false) {
    this.ctx = ctx;
    this.markdown = markdown;
    this.buttons = {
      launch: this.ctx.i18n.t('keyboards.launch'),
      back: this.ctx.i18n.t('keyboards.navigation.back'),
      next: this.ctx.i18n.t('keyboards.navigation.next'),
      about: this.ctx.i18n.t('keyboards.main-menu.about'),
      journey: this.ctx.i18n.t('keyboards.main-menu.journey'),
      hotels: this.ctx.i18n.t('keyboards.main-menu.hotels'),
      riding: this.ctx.i18n.t('keyboards.main-menu.riding'),
      rent: this.ctx.i18n.t('keyboards.main-menu.rent'),
      instructors: this.ctx.i18n.t('keyboards.main-menu.instructors'),
      freeride: this.ctx.i18n.t('keyboards.main-menu.freeride'),
      contacts: this.ctx.i18n.t('keyboards.main-menu.contacts')
    };
  }

  keyboard(layout) {
    const keyboard = Markup.keyboard(layout).resize();
    if (this.markdown) {
      return Extra.markdown().markup(keyboard);
    }
    return keyboard.extra();
  }

  launch() {
    return this.keyboard([this.buttons.launch]);
  }

  main() {
    const layout = [
      [this.buttons.about, this.buttons.hotels],
      [this.buttons.riding, this.buttons.rent],
      [this.buttons.instructors, this.buttons.freeride],
      [this.buttons.contacts]
    ];
    return this.keyboard(layout);
  }

  navigation(key) {
    if (key) {
      switch (key) {
        case 'back':
          return this.keyboard([this.buttons.back]);
        case 'next':
          return this.keyboard([this.buttons.next]);
      }
    }
    const layout = [
      [this.buttons.next],
      [this.buttons.back],
    ];
    return this.keyboard(layout);
  }
}

module.exports = Keyboard;
