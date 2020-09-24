const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

class Keyboard {
  constructor(ctx, markdown = false) {
    this.ctx = ctx;
    this.markdown = markdown;
    this.buttons = {
      launch: this.ctx.i18n.t('shared.launch'),
      back: this.ctx.i18n.t('navigation.back'),
      next: this.ctx.i18n.t('navigation.next'),
      skipass: this.ctx.i18n.t('categories.ski-passes'),
      rent: this.ctx.i18n.t('categories.rent'),
      instructors: this.ctx.i18n.t('categories.instructors'),
      freeride: this.ctx.i18n.t('categories.freeride'),
      contacts: this.ctx.i18n.t('categories.contacts'),
      rosaKhutor: this.ctx.i18n.t('resorts.rosa-khutor'),
      gorkiGorod: this.ctx.i18n.t('resorts.gorki-gorod'),
      gazprom: this.ctx.i18n.t('resorts.gazprom'),
      alpikaService: this.ctx.i18n.t('resorts.alpika-service'),
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

  main() {
    const layout = [
      [this.buttons.skipass, this.buttons.rent],
      [this.buttons.instructors, this.buttons.freeride],
      [this.buttons.contacts]
    ];

    return this.keyboard(layout);
  }

  resorts() {
    const layout = [
      [this.buttons.rosaKhutor, this.buttons.gorkiGorod],
      [this.buttons.gazprom, this.buttons.alpikaService]
    ];

    return this.keyboard(layout);
  }
}

module.exports = Keyboard;
