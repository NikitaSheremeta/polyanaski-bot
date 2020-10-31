const axios = require('axios');

// Сonnect to the API "Weather Unlocked" in case of an error, log it
async function connectToForecast() {
  return axios.get(process.env.API_URI)
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

// Parse the received data and prepare it for insertion into the message
async function parseForecast(timeID, timeTitle) {
  const forecastArray = await connectToForecast();

  if (!forecastArray) {
    return 'Ошибка получения данных...';
  }

  const forecastObject = forecastArray[timeID];

  return [
    timeTitle,
    forecastObject.base.temp_c,
    forecastObject.base.winddir_compass,
    forecastObject.base.windspd_ms,
    forecastObject.frzglvl_m
  ];
}

// Get parameters from the user and start parsing the forecast data
function getForecast(timeValue) {
  const timesOfDay = {
    morning: {
      id: 2, // ID is a key for fetching data from the received API
      title: 'Утро'
    },
    day: {
      id: 4,
      title: 'День'
    },
    evening: {
      id: 6,
      title: 'Вечер'
    },
    night: {
      id: 7,
      title: 'Ночь'
    }
  };

  switch (timeValue) {
    case 'Утро':
      parseForecast(timesOfDay.morning.id, timesOfDay.morning.title);
      break;
    case 'День':
      parseForecast(timesOfDay.day.id, timesOfDay.morning.title);
      break;
    case 'Вечер':
      parseForecast(timesOfDay.evening.id, timesOfDay.morning.title);
      break;
    case 'Ночь':
      parseForecast(timesOfDay.night.id, timesOfDay.morning.title);
      break;
  }
}

getForecast('Утро');
