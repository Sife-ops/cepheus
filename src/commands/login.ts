import * as c from '../utility/constant';
import * as f from '../utility/function';
import * as r from '../graphql/request';
import fs from 'fs';
import inquirer from 'inquirer';

export default async () => {
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
};
