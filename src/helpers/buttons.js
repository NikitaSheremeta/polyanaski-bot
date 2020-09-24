class Buttons {
  constructor(ctx) {
    this.ctx = ctx;
    this.buttons = {
      launch: this.ctx.i18n.t('shared.launch'),
      back: this.ctx.i18n.t('navigation.back'),
      next: this.ctx.i18n.t('navigation.next'),
      skipass: this.ctx.i18n.t('categories.ski-passes'),
      rent: this.ctx.i18n.t('categories.rent'),
      instructors: this.ctx.i18n.t('categories.instructors'),
      freeride: this.ctx.i18n.t('categories.freeride'),
      contacts: this.ctx.i18n.t('categories.contacts'),
      rosaKhutor: this.ctx.i18n.t('resorts.rosa-khutor'),
      gorkiGorod: this.ctx.i18n.t('resorts.gorki-gorod'),
      gazprom: this.ctx.i18n.t('resorts.gazprom'),
      alpikaService: this.ctx.i18n.t('resorts.alpika-service'),
    };
  }

  getButtons() {
    return this.buttons;
  }
}

module.exports = Buttons;
