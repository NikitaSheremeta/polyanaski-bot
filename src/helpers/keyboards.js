const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');

const Buttons = require('./buttons');

const ITEMS_TO_REMOVE = 1;
const GAZPROM_RESORT_INDEX = 2;

class Keyboards extends Buttons {
  constructor(ctx) {
    super(ctx);
    this.escape = false;
    this.mainMap = false;
    this.markdown = false;
    this.singleSkiPass = false;
    this.withoutGazprom = false;
  }

  // Set escape button
  set escapeKey(isEscape) {
    this.escape = isEscape;
  }

  // Set winter map button Krasnaya Polyana
  set mainMapKey(isMainMap) {
    this.mainMap = isMainMap;
  }

  // Set extra markdown for the buttons
  set extraMarkdown(isMarkdown) {
    this.markdown = isMarkdown;
  }

  // Set Single Ski Pass button
  set SSPKey(isSSP) {
    this.singleSkiPass = isSSP;
  }

  // Set resort keyboard without gazprom button
  set removeGazprom(isRemoveGazprom) {
    this.withoutGazprom = isRemoveGazprom;
  }

  // Result keyboard constructor
  keyboard(layout) {
    if (this.escape) {
      layout.push([this.buttons.back]);
    }

    if (this.mainMap) {
      layout.unshift([this.buttons.mainMap]);
    }

    if (this.singleSkiPass) {
      layout.unshift([this.buttons.singleSkiPass]);
    }

    if (this.withoutGazprom) {
      layout[0].splice(GAZPROM_RESORT_INDEX, ITEMS_TO_REMOVE);
    }

    const keyboard = Markup.keyboard(layout).resize();

    if (this.markdown) {
      return Extra.markdown().markup(keyboard);
    }

    return keyboard.extra();
  }

  // Launch keyboard
  get launch() {
    return this.keyboard([this.buttons.launch]);
  }

  // Go back keyboard
  get back() {
    return this.keyboard([this.buttons.back]);
  }

  // Categories a.k.a main keyboard
  get main() {
    const layout = [
      [this.buttons.openTrails, this.buttons.trailMaps],
      [this.buttons.instructors, this.buttons.skiPasses],
      [this.buttons.rent, this.buttons.forecast],
      [this.buttons.consultation]
    ];

    return this.keyboard(layout);
  }

  // Resorts of Krasnaya Polyana keyboard
  get resorts() {
    const layout = [
      [
        this.buttons.krasnayaPolyana,
        this.buttons.rosaKhutor,
        this.buttons.gazprom
      ],
    ];

    return this.keyboard(layout);
  }

  // Resorts of Krasnaya Polyana keyboard in full modification
  get resortsFull() {
    const layout = [
      [this.buttons.krasnayaPolyana, this.buttons.rosaKhutor],
      [this.buttons.gazpromLaura, this.buttons.gazpromAlpika]
    ];

    return this.keyboard(layout);
  }

  // Trains with an instructor keyboard
  get trains() {
    const layout = [
      [this.buttons.individualAndGroup],
      [this.buttons.childrensSchool, this.buttons.freeride]
    ];

    return this.keyboard(layout);
  }

  // Freeride keyboard
  get freeride() {
    const layout = [
      [this.buttons.krasnayaPolyana, this.buttons.abkhazia]
    ];

    return this.keyboard(layout);
  }

  // Forecast keyboard
  get forecast() {
    const layout = [
      [this.buttons.forADay, this.buttons.forAWeak]
    ];

    return this.keyboard(layout);
  }
}

module.exports = Keyboards;
