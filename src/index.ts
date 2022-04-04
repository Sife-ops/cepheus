#!/usr/bin/env node

import * as c from './utility/constant';
import * as f from './utility/function';
import * as r from './graphql/request';
import commands from './commands';
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

// todo: demand command?
const argv = yargs(hideBin(process.argv))
  /*
   * login
   */
  .command('login', 'log in', () => {}, commands.login)

  /*
   * bookmarks
   */
  .command(
    'bookmarks',
    'fetch bookmarks',
    () => {},
    f.tokenWrapper(async () => {
      const res = await f.fetchGql(r.bookmarksQuery);
      f.logger(res.data.bookmarks);
    })
  )

  /*
   * categories
   */
  .command(
    'categories',
    'fetch categories',
    () => {},
    f.tokenWrapper(async () => {
      const res = await f.fetchGql(r.categoriesQuery);
      f.logger(res.data.categories);
    })
  )

  .demandCommand(1, '')
  .help().argv;
