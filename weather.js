#!/usr/bin/env node
import process from 'process';
import { getArgs } from './helpers/args.js';
import {
  printError,
  printHelp,
  printSuccess,
  printWeather,
} from './services/log-service.js';
import {
  TOKEN_DICTIONARY,
  getValue,
  saveKeyValue,
} from './services/storage-service.js';
import { getCityLocation, getWeather } from './services/api-service.js';

const saveToken = async (token) => {
  if (!token.length) {
    return printError('Token not passed');
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Token saved');
  } catch (err) {
    printError(err.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    return printError('City not passed');
  }

  try {
    const res = await getCityLocation(city);
  } catch (err) {
    return printError(`City not found: ${city}`);
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess('City saved');
  } catch (err) {
    printError(err.message);
  }
};

const getForecast = async (city) => {
  const currCity = city ?? (await getValue(TOKEN_DICTIONARY.city));

  try {
    const weather = await getWeather(currCity);
    printWeather(weather);
  } catch (err) {
    if (err.response?.status === 400) {
      printError('City not passed');
    } else if (err.response?.status === 401) {
      printError('Wrong token passed');
    } else {
      printError(err.message);
    }
  }
};

const initCli = async () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.c) {
    return await saveCity(args.c);
  }
  if (args.t) {
    return await saveToken(args.t);
  }

  getForecast(process.env.CITY);
};

initCli();
