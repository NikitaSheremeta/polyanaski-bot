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
      logger.debug(this.ctx, error);

      this.weatherEmoji = '⁉️';
    }
  }

  /**
   * Сonnect to the API "Weather Unlocked" in case of an error, log it.
   * Thinking about replacing axos with a request?
   */
  async connectToForecast() {
    const url = process.env.FORECAST_API;

    const params = {
      lang: this.ctx.i18n.languageCode,
      num_of_days: this.numOfDays
    };

    try {
      const response = await axios.get(url, { params });

      if (response.data.forecast.length === 0) {
        throw 'Empty forecast array';
      }

      return response.data.forecast;
    } catch (error) {
      if (error.response) {
        logger.debug(this.ctx, error.response.data.title);
      } else if (error.request) {
        logger.debug(this.ctx, error.request);
      } else {
        logger.debug(this.ctx, error);
      }

      throw error;
    }
  }

  // Parsing the received data and preparing for insertion into the message.
  async parseForecast() {
    const inputForecast = await this.connectToForecast();

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

  /**
   * Finding an emoticon and its modification depending on the weather code
   * and time of day.
   */
  getWeatherEmoji(weatherCode, timeOfDay) {
    if (typeof this.weatherEmoji === 'string') {
      return this.weatherEmoji;
    }

    for (const iterator of this.weatherEmoji) {
      const searchResults = Common.linearSearch(iterator.codes, weatherCode);

      if (searchResults) {
        if (timeOfDay === TIMES_OF_DAY.night.time && weatherCode === 0) {
          return iterator.emojiNightMode;
        }

        return iterator.emoji;
      }
    }
  }

  headerContentTemplate() {
    if (this.numOfDays === ONE_DAY) {
      return dateFormat('dddd, d mmmm');
    }

    if (this.numOfDays === ONE_WEEK) {
      return 'Прогноз погоды на неделю';
    }
  }

  createBodyContent(item) {
    const messageArray = [
      `• Температура воздуха: ${item.base.temp_c} ℃`,
      `• Кол-во свежего снега: ${item.upper.freshsnow_cm} см`,
    ];
    const weatherEmoji = this.getWeatherEmoji(item.base.wx_code, item.time);

    let title = '';

    if (this.numOfDays === ONE_DAY) {
      /**
       * This is a fix for the forecast API error, it is displayed
       * as sun at night, but not clear.
       * And in general it will only be clear.
       */
      if (item.base.wx_desc === 'Солнце') {
        item.base.wx_desc = 'Ясно';
      }

      title = `<b>(${item.time}) ${weatherEmoji} ${item.base.wx_desc}</b>`;

      messageArray.splice(1, 0,
        `• Скорость ветра: ${item.mid.windspd_ms} м/с`,
        `• Видимость: ${item.vis_km} км`,
        `• Уровень замерзания: ${item.frzglvl_m} м`,
      );
    }

    if (this.numOfDays === ONE_WEEK) {
      /**
       * The API gives the date in the day / month / year format,
       * and the dateFormator accepts a date in the month / day / year format as input.
       * This is the easiest way out of this situation.
       */
      const dateParts = item.date.split('/');

      item.date = [dateParts[1], dateParts[0], dateParts[2]];

      title = `<b>${dateFormat(item.date, 'dddd, d mmmm')}</b>`;

      messageArray.splice(0, 0, `• ${weatherEmoji} ${item.base.wx_desc}`);
    }

    messageArray.splice(0, 0, title);

    return messageArray;
  }

  bodyContentTemplate(forecast) {
    const bodyMessageTemplate = [];

    forecast.forEach((item) => {
      const message = this.createBodyContent(item);

      bodyMessageTemplate.push(' ', ...message);
    });

    return bodyMessageTemplate;
  }

  async createMessage() {
    const forecast = await this.parseForecast();
    const headerContent = this.headerContentTemplate();
    const bodyContent = this.bodyContentTemplate(forecast);

    const messageArray = [headerContent, ...bodyContent];

    return messageArray.join('\n');
  }

  async getMessage() {
    try {
      return await this.createMessage();
    } catch (error) {
      return this.ctx.i18n.t('shared.errorReceivingData');
    }
  }
}

module.exports = Forecast;
