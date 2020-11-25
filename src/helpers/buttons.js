class Buttons {
  constructor(ctx) {
    this.ctx = ctx;
    this.buttons = {
      abkhazia: this.ctx.i18n.t('util.abkhazia'),
      back: this.ctx.i18n.t('navigation.back'),
      booking: this.ctx.i18n.t('util.booking'),
      childrensSchool: this.ctx.i18n.t('categories.childrensSchool'),
      consultation: this.ctx.i18n.t('categories.consultation'),
      consultationWithInstructor: this.ctx.i18n.t('scenes.consultation.consultationWithInstructor'),
      contactInstructor: this.ctx.i18n.t('contacts.instructor'),
      contactTechSupport: this.ctx.i18n.t('contacts.techSupport'),
      downloadMap: this.ctx.i18n.t('util.downloadMap'),
      forADay: this.ctx.i18n.t('scenes.weather.forADay'),
      forAWeak: this.ctx.i18n.t('scenes.weather.forAWeak'),
      freeride: this.ctx.i18n.t('categories.freeride'),
      gazprom: this.ctx.i18n.t('resorts.gazprom'),
      individualAndGroup: this.ctx.i18n.t('scenes.instructors.individualAndGroup'),
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
      techSupport: this.ctx.i18n.t('scenes.consultation.techSupport'),
      trailMaps: this.ctx.i18n.t('categories.trailMaps'),
      weather: this.ctx.i18n.t('categories.weather')
    };
  }
}

module.exports = Buttons;
