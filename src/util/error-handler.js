const logger = require('./logger');

function asyncWrapper(fn) {
  return (async (ctx, next) => {
    try {
      return await fn(ctx);
    } catch (error) {
      logger.error(ctx, 'asyncWrapper error, %O', error);

      await ctx.reply(ctx.i18n.t('shared.error'));

      return next();
    }
  });
}

module.exports = { asyncWrapper };
