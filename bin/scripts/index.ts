#!/usr/bin/env tsx

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import start from './src/start';
import stop from './src/stop';

yargs(hideBin(process.argv))
  .command('start', 'start the docker containers', (y) => y.option('dbOnly', {
    type: 'boolean',
    description: 'Only start the database containers',
    default: false,
  }), (argv) => {
    if (argv.dbOnly) {
      start(true);
    } else {
      start();
    }
  })
  .command('stop', 'stop the docker containers', (y) => y, () => {
    stop();
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging',
  })
  .parse();
