class Buttons {
  constructor(ctx) {
    this.ctx = ctx;
    this.buttons = {
      abkhazia: this.ctx.i18n.t('util.abkhazia'),
      back: this.ctx.i18n.t('navigation.back'),
      childrensSchool: this.ctx.i18n.t('categories.childrensSchool'),
      consultation: this.ctx.i18n.t('categories.consultation'),
      day: this.ctx.i18n.t('weather.day'),
      evening: this.ctx.i18n.t('weather.evening'),
      freeride: this.ctx.i18n.t('categories.freeride'),
      gazprom: this.ctx.i18n.t('resorts.gazprom'),
      individualAndGroup: this.ctx.i18n.t('training.individualAndGroup'),
      instructors: this.ctx.i18n.t('categories.instructors'),
      mainMap: this.ctx.i18n.t('util.mainMap'),
      krasnayaPolyana: this.ctx.i18n.t('resorts.krasnayaPolyana'),
      launch: this.ctx.i18n.t('shared.launch'),
      morning: this.ctx.i18n.t('weather.morning'),
      next: this.ctx.i18n.t('navigation.next'),
      night: this.ctx.i18n.t('weather.night'),
      openTrails: this.ctx.i18n.t('categories.openTrails'),
      rent: this.ctx.i18n.t('categories.rent'),
      rosaKhutor: this.ctx.i18n.t('resorts.rosaKhutor'),
      singleSkiPass: this.ctx.i18n.t('util.singleSkiPass'),
      skiPasses: this.ctx.i18n.t('categories.skiPasses'),
      trailMaps: this.ctx.i18n.t('categories.trailMaps'),
      weather: this.ctx.i18n.t('categories.weather')
    };
  }

  get day() {
    return this.buttons.day;
  }

  get evening() {
    return this.buttons.evening;
  }

  get morning() {
    return this.buttons.morning;
  }

  get night() {
    return this.buttons.night;
  }
}

module.exports = Buttons;
