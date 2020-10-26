class Messages {
  constructor(ctx) {
    this.ctx = ctx;
    this.messages = {
      description: ctx.i18n.t('scenes.start.description'),
      greeting: ctx.i18n.t('scenes.start.greeting'),
      go: ctx.i18n.t('shared.go'),
      mainMenu: ctx.i18n.t('shared.mainMenu'),
      openTrails: ctx.i18n.t('shared.openTrails'),
      trailMaps: ctx.i18n.t('shared.trailMaps'),
      instructors: ctx.i18n.t('shared.instructors'),
      skiPasses: ctx.i18n.t('shared.skiPasses')
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

  get openTrails() {
    return this.messages.openTrails;
  }

  get trailMaps() {
    return this.messages.trailMaps;
  }

  get instructors() {
    return this.messages.instructors;
  }

  get skiPasses() {
    return this.messages.skiPasses;
  }
}

module.exports = Messages;
