class Buttons {
  constructor(ctx) {
    this.ctx = ctx;
    this.buttons = {
      back: this.ctx.i18n.t('navigation.back'),
      childrensSchool: this.ctx.i18n.t('categories.childrensSchool'),
      consultation: this.ctx.i18n.t('categories.consultation'),
      freeride: this.ctx.i18n.t('categories.freeride'),
      gazprom: this.ctx.i18n.t('resorts.gazprom'),
      individualAndGroup: this.ctx.i18n.t('training.individualAndGroup'),
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

  get back() {
    return this.buttons.back;
  }
}

module.exports = Buttons;
