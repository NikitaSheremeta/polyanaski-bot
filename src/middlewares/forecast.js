// TODO: Добавить документацию
// TODO: Добавить логирование
// TODO: Добавить i18n
// TODO: Добавить время прогноза
// TODO: Добавить HTML список в возврат getMessage
// TODO: QA тесты
// TODO: Рефакторинг

const Buttons = require('../helpers/buttons');

const axios = require('axios');
const dateFormat = require('dateformat');

class Forecast extends Buttons {
  constructor(ctx) {
    super(ctx);
  }

  // Сonnect to the API "Weather Unlocked" in case of an error, log it.
  async connectToForecast() {
    return axios.get(process.env.FORECAST_API)
      .then((response) => {
        return response.data.forecast;
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }

        return false;
      });
  }

  // Parsing the received data and preparing for insertion into the message.
  async parseForecast(timeID) {
    const forecastArray = await this.connectToForecast();

    if (!forecastArray) {
      return 'Ошибка получения данных...';
    }

    const forecastObject = forecastArray[timeID];

    return {
      temperatureC: forecastObject.base.temp_c,
      windDirectionCompass: forecastObject.base.winddir_compass,
      windSpeedMs: forecastObject.base.windspd_ms,
      freezingLevel: forecastObject.frzglvl_m
    };
  }

  // Get parameters from the user and start parsing the forecast data.
  getForecast(timeValue) {
    const timesOfDay = {
      morning: {
        id: 2 // ID is a key for fetching data from the received API.
      },
      day: {
        id: 4
      },
      evening: {
        id: 6
      },
      night: {
        id: 7
      }
    };

    switch (timeValue) {
      case 'Утро':
        return this.parseForecast(timesOfDay.morning.id);
      case 'День':
        return this.parseForecast(timesOfDay.day.id);
      case 'Вечер':
        return this.parseForecast(timesOfDay.evening.id);
      case 'Ночь':
        return this.parseForecast(timesOfDay.night.id);
    }
  }

  /**
    * Receiving parameters from the user and generating a forecast
    * in the format of markdown markup.
    * @param {string} timeValue - Times of Day
    */
  async getMessage(timeValue) {
    const forecast = await this.getForecast(timeValue);

    const forecastTitle = `<b>${dateFormat('dddd d mmmm')} (${timeValue})</b>`;

    const forecastArray = [
      forecastTitle,
      `Температура воздуха: ${forecast.temperatureC} ℃`,
      `Направление ветра: ${forecast.windDirectionCompass}`,
      `Скорость ветра: ${forecast.windSpeedMs} м/с`,
      `Уровень замерзания: ${forecast.freezingLevel} м`
    ];

    return forecastArray.join('\n');
  }
}

module.exports = Forecast;
