class Messages {
  constructor(ctx) {
    this.ctx = ctx;
    this.messages = {
      greeting: ctx.i18n.t('scenes.start.greeting'),
      description: ctx.i18n.t('scenes.start.description'),
      go: ctx.i18n.t('shared.go'),
      mainMenu: ctx.i18n.t('shared.mainMenu')
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
}

module.exports = Messages;
