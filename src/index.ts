#!/usr/bin/env node

import * as c from './utility/constant';
import * as f from './utility/function';
import * as j from 'jsonwebtoken';
import fs from 'fs';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

try {
  const accessToken = fs.readFileSync(c.cacheFile, 'utf8');

  const decoded = j.decode(accessToken);
  if (!decoded || typeof decoded === 'string' || !decoded.exp) {
    throw new Error('invalid token');
  }

  const expiration = decoded.exp * 1000;
  const now = new Date().getTime();
  const offset = 10000;
  if (now + offset > expiration) {
    throw new Error('expired token');
  }

  f.setToken(accessToken);
} catch (e) {
  // todo: indicate not logged in
  console.log('You are not logged in.');
}

const argv = yargs(hideBin(process.argv))
  .commandDir('commands')
  .demandCommand(1, '')
  .help().argv;
