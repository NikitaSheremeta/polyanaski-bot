const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');
const Buttons = require('./buttons');

class Keyboards extends Buttons {
  constructor(ctx) {
    super(ctx);
    this.markdown = false;
    this.mainMap = false;
    this.escape = false;
  }

  keyboard(layout) {
    if (this.mainMap) {
      layout.unshift([this.buttons.mainMap]);
    }

    if (this.escape) {
      layout.push([this.buttons.back]);
    }

    const keyboard = Markup.keyboard(layout).resize();

    if (this.markdown) {
      return Extra.markdown().markup(keyboard);
    }

    return keyboard.extra();
  }

  // Set winter map button Krasnaya Polyana
  set mainMapKey(isMainMap) {
    this.mainMap = isMainMap;
  }

  // Set escape button
  set escapeKey(isEscape) {
    this.escape = isEscape;
  }

  // Set extra for the buttons
  set extraMarkdown(isMarkdown) {
    this.markdown = isMarkdown;
  }

  get launch() {
    return this.keyboard([this.buttons.launch]);
  }

  get back() {
    return this.keyboard([this.buttons.back]);
  }

  get main() {
    const layout = [
      [this.buttons.openTrails, this.buttons.trailMaps],
      [this.buttons.instructors, this.buttons.skiPasses],
      [this.buttons.rent, this.buttons.weather],
      [this.buttons.consultation]
    ];

    return this.keyboard(layout);
  }

  get resorts() {
    const layout = [
      [this.buttons.krasnayaPolyana],
      [this.buttons.rosaKhutor],
      [this.buttons.gazprom],
    ];

    return this.keyboard(layout);
  }
}

module.exports = Keyboards;
