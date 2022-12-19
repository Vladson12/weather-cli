#!/usr/bin/env node
import process from 'process';
import { getArgs } from './helpers/args.js';
import { printError, printHelp, printSuccess } from './services/log-service.js';

const initCli = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    printHelp();
  }
};

initCli();
