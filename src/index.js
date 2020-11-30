const moment = require('moment');

moment.locale('ru');

const time = moment('2020-11-30').format('dddd, Do');

console.log(time);
