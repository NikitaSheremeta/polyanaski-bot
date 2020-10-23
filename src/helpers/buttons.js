class Buttons {
  constructor(ctx) {
    this.ctx = ctx;
    this.buttons = {
      back: this.ctx.i18n.t('navigation.back'),
      consultation: this.ctx.i18n.t('categories.consultation'),
      gazprom: this.ctx.i18n.t('resorts.gazprom'),
      instructors: this.ctx.i18n.t('categories.instructors'),
      mainMap: this.ctx.i18n.t('util.mainMap'),
      krasnayaPolyana: this.ctx.i18n.t('resorts.krasnayaPolyana'),
      launch: this.ctx.i18n.t('shared.launch'),
      next: this.ctx.i18n.t('navigation.next'),
      openTrails: this.ctx.i18n.t('categories.openTrails'),
      rent: this.ctx.i18n.t('categories.rent'),
      rosaKhutor: this.ctx.i18n.t('resorts.rosaKhutor'),
      singleSkiPass: this.ctx.i18n.t('util.singleSkiPass'),
      skiPasses: this.ctx.i18n.t('categories.skiPasses'),
      trailMaps: this.ctx.i18n.t('categories.trailMaps'),
      weather: this.ctx.i18n.t('categories.weather')
    };
  }
}

module.exports = Buttons;
