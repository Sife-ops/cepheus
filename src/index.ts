#!/usr/bin/env node

import * as c from './utility/constant';
import * as f from './utility/function';
import * as j from 'jsonwebtoken';
import fetch from 'cross-fetch';
import fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const main = async () => {
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

    f.setAccessToken(accessToken);
  } catch (e) {
    console.log('You are not logged in.');
  }

  // todo: add try-catch?
  if (f.getAccessToken().length > 0) {
    fetch(`${c.url}/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        authorization: f.getAccessToken(),
      },
    }).then(async (res) => {
      if (!res.ok) {
        console.log('refresh failed');
      }
      const data = await res.json();
      fs.writeFileSync(c.cacheFile, data.accessToken);
    });
  }

  const argv = yargs(hideBin(process.argv))
    .command(
      '*',
      'Show help',
      () => {},
      () => {
        yargs.showHelp();
      }
    )
    .commandDir('commands')
    .help().argv;
};

main();
