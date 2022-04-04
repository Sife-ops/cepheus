#!/usr/bin/env node

import * as c from './utility/constant';
import * as f from './utility/function';
import * as r from './graphql/request';
import fs from 'fs';
import inquirer from 'inquirer';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

try {
  const a = fs.readFileSync(c.cacheFile, 'utf8');
  // todo: check token expiration
  f.setToken(a);
} catch (e) {
  // todo: indicate not logged in
  // console.log('no token cache');
}

// todo: demand command?
const argv = yargs(hideBin(process.argv))
  /*
   * login
   */
  .command(
    'login',
    'log into account',
    () => {},
    async () => {
      const input = await inquirer.prompt([
        {
          message: 'username',
          name: 'username',
          type: 'string',
        },
        {
          message: 'password',
          name: 'password',
          type: 'password',
        },
        {
          message: 'remember',
          name: 'remember',
          type: 'list',
          choices: ['yes', 'no'],
        },
      ]);

      input.remember = input.remember === 'yes' ? true : false;

      const res = await f.fetchGql(r.loginMutation, input);

      // todo: response validation

      fs.writeFileSync(c.cacheFile, res.data.login.accessToken);
    }
  )

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

  .help().argv;
