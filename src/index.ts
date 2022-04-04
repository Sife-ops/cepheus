#!/usr/bin/env node

import * as c from './utility/constant';
import * as f from './utility/function';
import fs from 'fs';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

try {
  const accessToken = fs.readFileSync(c.cacheFile, 'utf8');
  // todo: check token expiration
  f.setToken(accessToken);
} catch (e) {
  // todo: indicate not logged in
  // console.log('no token cache');
}

const argv = yargs(hideBin(process.argv))
  .commandDir('commands')
  .demandCommand(1, '')
  .help().argv;
