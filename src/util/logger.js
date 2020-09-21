const util = require('util');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

function prepareMessage(ctx, msg, ...data) {
  const formattedMessage = data.length ? util.format(msg, ...data) : msg;

  if (ctx && ctx.from) {
    return `[${ctx.from.id}/${ctx.from.username}]: ${formattedMessage}`;
  }

  return `: ${formattedMessage}`;
}

const logFormat = printf(info => {
  return `[${info.timestamp}] [${info.level}]${info.message}`;
});

const logger = createLogger({
  transports: [
    new transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug'
    }),
    new transports.File({ filename: 'debug.log', level: 'debug' })
  ],
  format: combine(timestamp(), format.splat(), format.simple(), logFormat)
});

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}

const CTXLogger = {
  debug: (ctx, msg, ...data) => logger.debug(prepareMessage(ctx, msg, ...data)),
  error: (ctx, msg, ...data) => logger.error(prepareMessage(ctx, msg, ...data))
};

module.exports = { CTXLogger };
