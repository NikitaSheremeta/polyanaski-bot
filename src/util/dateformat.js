/**
  * Presumably this will be a patch for the dateformat module
  * It is assumed that the user's region will be recognized from the session,
  * based on this data, the object i18n will be overwritten.
  */
const dateFormat = require('dateformat');

dateFormat.i18n = {
  dayNames: [
    'Вс', 'Пн', 'Вт', 'Чт', 'Сб', 'Пт', 'Сб',
    'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'
  ],
  monthNames: [
    'янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек',
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабрь'
  ],
  timeNames: [
    'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
  ]
};

module.exports = dateFormat;
