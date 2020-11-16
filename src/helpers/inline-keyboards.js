const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');

const Buttons = require('./buttons');

class InlineKeyboards extends Buttons {
  constructor(ctx) {
    super(ctx);
  }

  // Result keyboard constructor
  keyboard(layout) {
    const keyboard = Markup.inlineKeyboard(layout);

    return Extra.markup(keyboard);
  }

  get consultation() {
    const layout = [
      [{
        text: this.buttons.consultationWithInstructor,
        url: 't.me/@EvgenyVolkov1'
      }],
      [{
        text: this.buttons.consultationWithSupport,
        url: 't.me/@NikitaSheremeta'
      }]
    ];

    return this.keyboard(layout);
  }
}

module.exports = InlineKeyboards;
