// Наблюдения: 8 ноября 03:00 API не обновилось, показывает прогноз на 7 ноября
const axios = require('axios');

const WeatherEmoji = require('../models/weather-emoji');

const Common = require('../helpers/common');

const { logger } = require('../util/logger');
const dateFormat = require('../util/dateformat');

const ONE_DAY = 1;
const ONE_WEEK = 7;
const TIMES_OF_DAY = {
  night: {
    index: 0, // Index is a key for fetching data from the received API.
    time: '01:00'
  },
  morning: {
    index: 2,
    time: '07:00',
  },
  day: {
    index: 4,
    time: '13:00'
  },
  evening: {
    index: 6,
    time: '19:00'
  }
};

/**
 * @param {ContextMessageUpdate} ctx - Telegram context.
 * @param {number} numOfDays - Number of days for forecast API.
 */
class Forecast {
  constructor(ctx, numOfDays = ONE_DAY) {
    this.ctx = ctx;
    this.numOfDays = numOfDays; // The value of a number from 1 to 7.
    this.weatherEmoji;
    this.connectToWeatherEmoji();
  }

  async connectToWeatherEmoji() {
    try {
      this.weatherEmoji = await WeatherEmoji.find();
    } catch (error) {
      logger.debug(this.ctx, error.message);

      return false;
    }
  }

  // Сonnect to the API "Weather Unlocked" in case of an error, log it.
  async connectToForecast() {
    const url = process.env.FORECAST_API + `&num_of_days=${this.numOfDays}`;

    return axios.get(url)
      .then((response) => response.data.forecast)
      .catch((error) => {
        if (error.response) {
          logger.debug(this.ctx, error.response.data);
          logger.debug(this.ctx, error.response.status);
          logger.debug(this.ctx, error.response.headers);
        } else if (error.request) {
          logger.debug(this.ctx, error.request);
        } else {
          logger.debug(this.ctx, error.message);
        }
      });
  }

  // Parsing the received data and preparing for insertion into the message.
  async parseForecast() {
    const inputForecast = await this.connectToForecast();

    if (!inputForecast) {
      return this.ctx.i18n.t('shared.errorReceivingData');
    }

    const selectedTimes = [
      TIMES_OF_DAY.night.index,
      TIMES_OF_DAY.morning.index,
      TIMES_OF_DAY.day.index,
      TIMES_OF_DAY.evening.index,
    ];
    const outputForecast = [];

    if (this.numOfDays === ONE_DAY) {
      selectedTimes.forEach(item => {
        outputForecast.push(inputForecast[item]);
      });
    }

    if (this.numOfDays === ONE_WEEK) {
      inputForecast.forEach(item => {
        if (item.time === TIMES_OF_DAY.day.time) {
          outputForecast.push(item);
        }
      });
    }

    return outputForecast;
  }

  getWeatherEmoji(weatherCode) {
    if (!this.weatherEmoji) {
      return '⁉️';
    }

    for (const iterator of this.weatherEmoji) {
      const searchResult = Common.linearSearch(iterator.codes, weatherCode);

      if (searchResult) {
        return iterator.emoji;
      }
    }

    return '⁉️';
  }

  headerContentTemplate() {
    if (this.numOfDays === ONE_DAY) {
      return dateFormat('dddd, d mmmm');
    }

    if (this.numOfDays === ONE_WEEK) {
      return this.ctx.i18n.t('weather.forAWeak');
    }
  }

  createBodyContent(item) {
    const message = [
      `• Температура воздуха: ${item.base.temp_c} ℃`,
      `• Кол-во свежего снега: ${item.upper.freshsnow_cm} см`,
    ];

    const emoji = this.getWeatherEmoji(item.base.wx_code);

    if (this.numOfDays === ONE_DAY) {
      /**
        * This is a fix for the forecast API error, it is displayed
        * as sun at night, but not clear.
        */
      if (item.time === TIMES_OF_DAY.night.time
          && item.base.wx_desc === ' Солнце') {
        item.base.wx_desc = 'Ясно';
      }

      const title = `<b>(${item.time}) ${emoji} ${item.base.wx_desc}</b>`;

      message.splice(0, 0, title);

      const row = [
        `• Скорость ветра: ${item.mid.windspd_ms} м/с`,
        `• Видимость: ${item.vis_km} км`,
        `• Уровень замерзания: ${item.frzglvl_m} м`,
      ];

      message.splice(2, 0, ...row);
    }

    if (this.numOfDays === ONE_WEEK) {
      /**
        * The API gives the date in the day / month / year format,
        * and the dateFormator accepts a date in the month / day / year format as input.
        * This is the easiest way out of this situation.
        */
      const dateParts = item.date.split('/');

      item.date = [dateParts[1], dateParts[0], dateParts[2]];

      const title = `<b>${dateFormat(item.date, 'dddd, d mmmm')}</b>`;

      message.splice(0, 0, title);
    }

    return message;
  }

  bodyContentTemplate(foreacast) {
    const bodyMessageTemplate = [];

    foreacast.forEach((item) => {
      const message = this.createBodyContent(item);

      bodyMessageTemplate.push(' ', ...message);
    });

    return bodyMessageTemplate;
  }

  async createMessage() {
    const foreacast = await this.parseForecast();
    const headerMessage = this.headerContentTemplate();
    const bodyMessage = this.bodyContentTemplate(foreacast);
    const messgaeArray = [];

    messgaeArray.push(headerMessage, ...bodyMessage);

    return messgaeArray.join('\n');
  }

  async getMessage() {
    try {
      return await this.createMessage();
    } catch (error) {
      logger.debug(this.ctx, error.message);
    }
  }
}

module.exports = Forecast;
