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
    'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек',
    'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабрь'
  ],
  timeNames: [
    'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
  ]
};

module.exports = dateFormat;
