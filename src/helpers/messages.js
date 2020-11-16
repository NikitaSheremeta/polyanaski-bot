class Messages {
  constructor(ctx) {
    this.ctx = ctx;
    this.messages = {
      childrensSchool: ctx.i18n.t('scenes.instructors.childrensSchool'),
      consultation: ctx.i18n.t('scenes.consultation.intro'),
      description: ctx.i18n.t('scenes.start.description'),
      freeride: ctx.i18n.t('scenes.instructors.freeride'),
      go: ctx.i18n.t('shared.go'),
      greeting: ctx.i18n.t('scenes.start.greeting'),
      instructors: ctx.i18n.t('scenes.instructors.intro'),
      mainMenu: ctx.i18n.t('shared.mainMenu'),
      openTrails: ctx.i18n.t('scenes.openTrails.intro'),
      skiPasses: ctx.i18n.t('scenes.skiPasses.intro'),
      trailMaps: ctx.i18n.t('scenes.trailMaps.intro'),
      workInProgress: ctx.i18n.t('shared.workInProgress'),
      weather: ctx.i18n.t('scenes.weather.intro'),
      welcomeBack: ctx.i18n.t('shared.welcomeBack')
    };
  }

  get childrensSchool() {
    return this.messages.childrensSchool;
  }

  get consultation() {
    return this.messages.consultation;
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
