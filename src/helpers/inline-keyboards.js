const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');

const Buttons = require('./buttons');

class InlineKeyboards extends Buttons {
  constructor(ctx) {
    super(ctx);
    this.markdown = false;
  }

  // Set extra markdown for the buttons
  set extraMarkdown(isMarkdown) {
    this.markdown = isMarkdown;
  }

  // Result keyboard constructor
  keyboard(layout) {
    const keyboard = Markup.inlineKeyboard(layout);

    if (this.markdown) {
      return Extra.markdown().markup(keyboard);
    }

    return Extra.markup(keyboard);
  }

  // Consultation inline keyboard
  get consultation() {
    const layout = [
      [{
        text: this.buttons.consultationWithInstructor,
        url: this.buttons.contactInstructor
      }],
      [{
        text: this.buttons.techSupport,
        url: this.buttons.contactTechSupport
      }]
    ];

    return this.keyboard(layout);
  }

  // Booking inline keyboard
  booking(text, url) {
    if (!text) {
      text = this.buttons.booking;
    }

    if (!url) {
      url = this.buttons.contactInstructor;
    }

    const layout = [ [{ text, url }] ];

    return this.keyboard(layout);
  }

  downloadMap(query) {
    const layout = [
      [{
        text: this.buttons.downloadMap,
        callback_data: query
      }]
    ];

    return this.keyboard(layout);
  }

  buySkiPass(resort) {
    let url = String;

    switch (resort) {
      case this.ctx.i18n.t('resorts.krasnayaPolyana'):
        url = process.env.KP_BUY_SKI_PASS_URL;
        break;
      case this.ctx.i18n.t('resorts.rosaKhutor'):
        url = process.env.RK_BUY_SKI_PASS_URL;
        break;
      case this.ctx.i18n.t('resorts.gazprom'):
        url = process.env.GP_BUY_SKI_PASS_URL;
        break;
    }

    const layout = [
      [{
        text: this.buttons.buySkiPass,
        url
      }]
    ];

    return this.keyboard(layout);
  }
}

module.exports = InlineKeyboards;
