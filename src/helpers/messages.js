class Messages {
  constructor(ctx) {
    this.ctx = ctx;
    this.messages = {
      description: ctx.i18n.t('scenes.start.description'),
      go: ctx.i18n.t('shared.go'),
      greeting: ctx.i18n.t('scenes.start.greeting'),
      instructors: ctx.i18n.t('shared.instructors'),
      mainMenu: ctx.i18n.t('shared.mainMenu'),
      openTrails: ctx.i18n.t('shared.openTrails'),
      skiPasses: ctx.i18n.t('shared.skiPasses'),
      trailMaps: ctx.i18n.t('shared.trailMaps'),
      workInProgress: ctx.i18n.t('shared.workInProgress')
    };
  }

  get description() {
    return this.messages.description;
  }

  get go() {
    return this.messages.go;
  }

  get greeting() {
    return this.messages.greeting;
  }

  get instructors() {
    return this.messages.instructors;
  }

  get mainMenu() {
    return this.messages.mainMenu;
  }

  get openTrails() {
    return this.messages.openTrails;
  }

  get skiPasses() {
    return this.messages.skiPasses;
  }

  get trailMaps() {
    return this.messages.trailMaps;
  }

  get workInProgress() {
    return this.messages.workInProgress;
  }
}

module.exports = Messages;
