const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');

const { leave } = Stage;

const opening = new Scene('opening');

opening.enter((ctx) => ctx.reply('Hi'));
opening.leave((ctx) => ctx.reply('Bye'));
opening.hears(/hi/gi, leave());
opening.on('message', (ctx) => ctx.reply('Send `hi`'));

module.exports.opening = opening;
