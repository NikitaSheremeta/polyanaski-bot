const { CronJob } = require('cron');

const { openTrailsParser } = require('../parsers/open-trails');

const TWENTY_FOUR_HOUR = 24;
const SEVEN_HOUR = 7;

const now = new Date().getHours();

const openTrailsCron = new CronJob('*/30 * * * *', () => {
  if (TWENTY_FOUR_HOUR && now > SEVEN_HOUR) {
    openTrailsParser.start();
  }
}, null, true, 'Europe/Moscow');

openTrailsCron.start();
