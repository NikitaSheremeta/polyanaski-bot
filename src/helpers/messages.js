class Messages {
  constructor(ctx) {
    this.ctx = ctx;
    this.messages = {
      childrensSchool: ctx.i18n.t('shared.childrensSchool'),
      description: ctx.i18n.t('scenes.start.description'),
      freeride: ctx.i18n.t('shared.freeride'),
      go: ctx.i18n.t('shared.go'),
      greeting: ctx.i18n.t('scenes.start.greeting'),
      instructors: ctx.i18n.t('shared.instructors'),
      mainMenu: ctx.i18n.t('shared.mainMenu'),
      openTrails: ctx.i18n.t('shared.openTrails'),
      skiPasses: ctx.i18n.t('shared.skiPasses'),
      trailMaps: ctx.i18n.t('shared.trailMaps'),
      workInProgress: ctx.i18n.t('shared.workInProgress'),
      weather: ctx.i18n.t('shared.weather'),
      welcomeBack: ctx.i18n.t('shared.welcomeBack')
    };
  }

  get childrensSchool() {
    return this.messages.childrensSchool;
  }

  get description() {
    return this.messages.description;
  }

  get freeride() {
    return this.messages.freeride;
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

  get weather() {
    return this.messages.weather;
  }

  get workInProgress() {
    return this.messages.workInProgress;
  }

  get welcomeBack() {
    return this.messages.welcomeBack;
  }
}

module.exports = Messages;
