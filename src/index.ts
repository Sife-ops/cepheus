#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const main = async () => {
  const argv = yargs(hideBin(process.argv))
    .command(
      '*',
      'show help',
      () => {},
      () => {
        yargs.showHelp();
      }
    )
    .commandDir('commands')
    .help().argv;
};

main();
