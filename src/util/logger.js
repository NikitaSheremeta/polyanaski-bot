const util = require('util');

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

function prepareMessage(ctx, msg, ...data) {
  const message = data.length ? util.format(msg, ...data) : msg;

  if (ctx && ctx.from) {
    return `[${ctx.from.id}/${ctx.from.username}]: ${message}`;
  }

  return `: ${message}`;
}

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp(), format.splat(), format.simple(), logFormat),
  transports: [
    new transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug'
    }),
    new transports.File({ filename: 'debug.log', level: 'debug' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(format.colorize(), format.simple())
  }));
}

module.exports.logger = {
  debug: (ctx, msg, ...data) => logger.debug(prepareMessage(ctx, msg, ...data)),
  error: (ctx, msg, ...data) => logger.error(prepareMessage(ctx, msg, ...data))
};
