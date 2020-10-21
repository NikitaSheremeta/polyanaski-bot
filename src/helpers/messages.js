class Messages {
  constructor(ctx) {
    this.ctx = ctx;
    this.messages = {
      description: ctx.i18n.t('scenes.start.description'),
      greeting: ctx.i18n.t('scenes.start.greeting'),
      go: ctx.i18n.t('shared.go'),
      mainMenu: ctx.i18n.t('shared.mainMenu'),
      trailMaps: ctx.i18n.t('shared.trailMaps'),
    };
  }

  get greeting() {
    return this.messages.greeting;
  }

  get description() {
    return this.messages.description;
  }

  get go() {
    return this.messages.go;
  }

  get mainMenu() {
    return this.messages.mainMenu;
  }

  get trailMaps() {
    return this.messages.trailMaps;
  }
}

module.exports = Messages;
