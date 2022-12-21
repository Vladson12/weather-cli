#!/usr/bin/env node
import process from 'process';
import { getArgs } from './helpers/args.js';
import { printError, printHelp, printSuccess } from './services/log-service.js';
import { TOKEN_DICTIONARY, saveKeyValue } from './services/storage-service.js';
import { getWeather } from './services/api-service.js';

const saveToken = async (token) => {
  if (!token.length) {
    return printError("Token isn't passed");
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Token saved');
  } catch (err) {
    printError(err.message);
  }
};

const getForecast = async (city) => {
  try {
    const weather = await getWeather(city);
    console.log(weather);
  } catch (err) {
    if (err?.response?.status === 401) {
      printError('Wrong token passed');
    } else {
      printError(err.message);
    }
  }
};

const initCli = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    printHelp();
  }
  if (args.s) {
  }
  if (args.t) {
    return saveToken(args.t);
  }

  getForecast(process.env.CITY);
};

initCli();
