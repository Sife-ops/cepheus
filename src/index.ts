#!/usr/bin/env node

import * as c from './utility/constant';
import * as f from './utility/function';
import fs from 'fs';
import inquirer from 'inquirer';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { loginMutation } from './graphql/request';

try {
  const a = fs.readFileSync(c.cacheFile, 'utf8');
  f.setToken(a);
} catch (e) {
  // console.log('no token cache');
}

const tokenWrapper = (handler: (argv: any) => void) => {
  if (f.getToken() === '') {
    console.log('need to log in');
    return () => {};
  }
  return handler;
};

const argv = yargs(hideBin(process.argv))
  .command('*', 'default command', {
    builder: {},
    handler: (argv) => {
      console.log('run default command');
    },
  })

  /*
   * Login
   */
  .command(
    'login',
    'log into account',
    () => {},
    async () => {
      const i = await inquirer.prompt([
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

      i.remember = i.remember === 'yes' ? true : false;

      const res = await f.fetchGql(loginMutation, i);

      if (res.errors) {
        throw new Error(JSON.stringify(res.errors));
      }

      // todo: response validation

      fs.writeFileSync(c.cacheFile, res.data.login.accessToken);
    }
  )

  /*
   * todo: delete
   */
  .command(
    'hello',
    'say hello',
    () => {},
    tokenWrapper((argv) => {
      console.log('hello');
    })
  )

  .help().argv;
