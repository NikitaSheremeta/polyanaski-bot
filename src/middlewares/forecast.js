const axios = require('axios');
const dateFormat = require('dateformat');

const Buttons = require('../helpers/buttons');

const { logger } = require('../util/logger');

class Forecast extends Buttons {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
  }

  // Сonnect to the API "Weather Unlocked" in case of an error, log it.
  async connectToForecast() {
    return axios.get(process.env.FORECAST_API)
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
  async parseForecast(timeID) {
    const forecastArray = await this.connectToForecast();

    // TODO: Обработка ошибки и остановка скрипта
    if (!forecastArray) {
      return this.ctx.i18n.t('shared.errorReceivingData');
    }

    const forecastObject = forecastArray[timeID];

    return {
      time: forecastObject.time,
      temperatureC: forecastObject.base.temp_c,
      windDirectionCompass: forecastObject.base.winddir_compass,
      windSpeedMs: forecastObject.base.windspd_ms,
      freezingLevel: forecastObject.frzglvl_m
    };
  }

  // Get parameters from the user and start parsing the forecast data.
  getForecast(timeValue) {
    const timesOfDay = {
      night: {
        id: 0 // ID is a key for fetching data from the received API. (01:00)
      },
      morning: {
        id: 2 // Morning index (07:00)
      },
      day: {
        id: 4 // Day index (13:00)
      },
      evening: {
        id: 6 // Evening index (19:00)
      },
    };

    switch (timeValue) {
      case this.buttons.night:
        return this.parseForecast(timesOfDay.night.id);
      case this.buttons.morning:
        return this.parseForecast(timesOfDay.morning.id);
      case this.buttons.day:
        return this.parseForecast(timesOfDay.day.id);
      case this.buttons.evening:
        return this.parseForecast(timesOfDay.evening.id);
    }
  }

  /**
    * Receiving parameters from the user and generating a forecast
    * in the format of markdown markup.
    * @param {string} timeValue - Times of Day
    */
  async getMessage(timeValue) {
    const forecast = await this.getForecast(timeValue);

    const title = `<b>${dateFormat('dddd, d mmmm')} (${forecast.time})</b>`;

    const forecastArray = [
      title,
      `- Температура воздуха: ${forecast.temperatureC} ℃`,
      `- Направление ветра: ${forecast.windDirectionCompass}`,
      `- Скорость ветра: ${forecast.windSpeedMs} м/с`,
      `- Уровень замерзания: ${forecast.freezingLevel} м`
    ];

    return forecastArray.join('\n');
  }
}

module.exports = Forecast;
