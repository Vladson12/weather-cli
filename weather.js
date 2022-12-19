#!/usr/bin/env node
import process from 'process';
import { getArgs } from './helpers/args.js';
import { printError, printHelp, printSuccess } from './services/log-service.js';
import { saveKeyValue } from './services/storage-service.js';

const saveToken = async (token) => {
  if (!token.length) {
    return printError("Token isn't passed");
  }

  try {
    await saveKeyValue('token', token);
    printSuccess('Token saved');
  } catch (err) {
    printError(err.message);
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
};

initCli();
