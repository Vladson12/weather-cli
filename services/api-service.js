import { URL } from 'url';
import { TOKEN_DICTIONARY, getKeyValue } from './storage-service.js';
import axios from 'axios';

const limit = 1;
const units = 'metric';
const cityLocationUrl = new URL('http://api.openweathermap.org/geo/1.0/direct');
const currentWeatherUrl = new URL(
  'https://api.openweathermap.org/data/2.5/weather'
);
const lang = 'ru';

const token = process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));

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

export { getWeather };
