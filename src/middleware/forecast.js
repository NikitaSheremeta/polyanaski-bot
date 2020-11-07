const axios = require('axios');

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

  createBodyContent(item) {
    const message = [
      `• Температура воздуха: ${item.base.temp_c} ℃`,
      `• Кол-во свежего снега: ${item.upper.freshsnow_cm} см`,
    ];

    if (this.numOfDays === ONE_DAY) {
      const title = `<b>${item.time} ☀️ ${item.base.wx_desc}</b>`;

      message.splice(0, 0, title);

      const row = [
        `• Скорость ветра: ${item.mid.windspd_ms} м/с`,
        `• Видимость: ${item.vis_km} км`,
        `• Уровень замерзания: ${item.frzglvl_m} м`,
      ];

      message.splice(2, 0, ...row);
    }

    return message;
  }

  bodyContentTemplate(forecastData) {
    const bodyMessageTemplate = [];

    console.log(forecastData);

    forecastData.forEach((item) => {
      if (this.numOfDays === ONE_DAY) {
        const message = this.createBodyContent(item);

        bodyMessageTemplate.push(' ', ...message);
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

        bodyMessageTemplate.push(' ', title);

        const message = this.createBodyContent(item);

        bodyMessageTemplate.push(...message);
      }
    });

    return bodyMessageTemplate;
  }

  async createMessage() {
    const inputForecast = await this.parseForecast();
    const outputForecast = [];

    // Header content template.
    if (this.numOfDays === ONE_DAY) {
      const title = `${dateFormat('dddd, d mmmm')}`;

      outputForecast.push(title);
    }

    if (this.numOfDays === ONE_WEEK) {
      outputForecast.push('Прогноз погоды на неделю');
    }

    const bodyMessage = this.bodyContentTemplate(inputForecast);

    outputForecast.push(...bodyMessage);

    return outputForecast.join('\n');
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
