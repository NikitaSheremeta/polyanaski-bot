const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const Buttons = require('./buttons');

class Keyboards extends Buttons {
  constructor(ctx, markdown = false) {
    super(ctx);
    this.markdown = markdown;
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

module.exports = Keyboards;
