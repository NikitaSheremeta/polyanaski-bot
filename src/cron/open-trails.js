const { CronJob } = require('cron');

const { startParsingOpenTrails } = require('../parsers/open-trails');

const TWENTY_FOUR_HOUR = 24;
const SEVEN_HOUR = 7;

const openTrailsCron = new CronJob('*/30 * * * *', () => {
  const now = new Date().getHours();

  if (TWENTY_FOUR_HOUR && now > SEVEN_HOUR) {
    startParsingOpenTrails();
  }
}, null, true, 'Europe/Moscow');

openTrailsCron.start();
