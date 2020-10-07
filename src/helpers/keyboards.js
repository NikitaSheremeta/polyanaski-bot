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

  get launch() {
    return this.keyboard([this.buttons.launch]);
  }

  get back() {
    return this.keyboard([this.buttons.back]);
  }

  get main() {
    const layout = [
      [this.buttons.skipass, this.buttons.rent],
      [this.buttons.instructors, this.buttons.freeride],
      [this.buttons.contacts]
    ];

    return this.keyboard(layout);
  }

  get resorts() {
    const layout = [
      [this.buttons.rosaKhutor, this.buttons.gorkiGorod],
      [this.buttons.gazprom, this.buttons.alpikaService]
    ];

    return this.keyboard(layout);
  }
}

module.exports = Keyboards;
