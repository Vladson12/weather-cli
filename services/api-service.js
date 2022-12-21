import { URL } from 'url';
import { TOKEN_DICTIONARY, getValue } from './storage-service.js';
import axios from 'axios';

const limit = 1;
const units = 'metric';
const cityLocationUrl = new URL('http://api.openweathermap.org/geo/1.0/direct');
const currentWeatherUrl = new URL(
  'https://api.openweathermap.org/data/2.5/weather'
);
const lang = 'en';

const token = process.env.TOKEN ?? (await getValue(TOKEN_DICTIONARY.token));

const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case '01':
      return '☀️';
    case '02':
      return '🌤️';
    case '03':
      return '☁️';
    case '04':
      return '☁️';
    case '09':
      return '🌧️';
    case '10':
      return '🌦️';
    case '11':
      return '🌩️';
    case '13':
      return '❄️';
    case '50':
      return '🌫️';
    default:
      return '?';
  }
};

const getCityLocation = async (city) => {
  if (!token) {
    throw new Error('API key is not defined, set it by -t [API_KEY]');
  }

  const { data } = await axios.get(cityLocationUrl, {
    params: {
      q: city,
      limit: limit,
      appid: token,
    },
  });

  if (data.length === 0) {
    throw new Error(`City not found: ${city}`);
  }

  return { lat: data[0].lat, lon: data[0].lon };
};

const getWeather = async (city) => {
  const cityLocation = await getCityLocation(city);

  if (!token) {
    throw new Error('API key is not defined, set it by -t [API_KEY]');
  }

  const { data } = await axios.get(currentWeatherUrl, {
    params: {
      lat: cityLocation.lat,
      lon: cityLocation.lon,
      appid: token,
      units: units,
      lang: lang,
    },
  });

  return data;
};

export { getWeather, getCityLocation, getIcon };
