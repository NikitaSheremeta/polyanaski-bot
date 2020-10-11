class Buttons {
  constructor(ctx) {
    this.ctx = ctx;
    this.buttons = {
      launch: this.ctx.i18n.t('shared.launch'),
      back: this.ctx.i18n.t('navigation.back'),
      next: this.ctx.i18n.t('navigation.next'),
      openTrails: this.ctx.i18n.t('categories.openTrails'),
      trailMaps: this.ctx.i18n.t('categories.trailMaps'),
      instructors: this.ctx.i18n.t('categories.instructors'),
      skiPasses: this.ctx.i18n.t('categories.skiPasses'),
      rent: this.ctx.i18n.t('categories.rent'),
      weather: this.ctx.i18n.t('categories.weather'),
      consultation: this.ctx.i18n.t('categories.consultation'),
      krasnayaPolyana: this.ctx.i18n.t('resorts.krasnayaPolyana'),
      rosaKhutor: this.ctx.i18n.t('resorts.rosaKhutor'),
      gazprom: this.ctx.i18n.t('resorts.gazprom')
    };
  }
}

module.exports = Buttons;
