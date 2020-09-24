class Messages {
  constructor(ctx) {
    this.ctx = ctx;
    this.messages = {
      greeting: ctx.i18n.t('scenes.start.greeting'),
      description: ctx.i18n.t('scenes.start.description'),
      go: ctx.i18n.t('shared.go'),
      mainMenu: ctx.i18n.t('shared.main-menu')
    };
  }

  getMessages() {
    return this.messages;
  }
}

module.exports = Messages;
