#!/usr/bin/env node

import * as c from './utility/constant';
import * as f from './utility/function';
import fetch from 'cross-fetch';
import fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { loginMutation } from './graphql/request';

try {
  f.setToken(fs.readFileSync(c.cacheFile, 'utf8'));
} catch {
  console.log('no token cache');
}

const main = async () => {
  const res = await f.fetchGql(loginMutation, {
    // username: "",
    // password: "",
  });

  if (res.errors) {
    throw new Error(JSON.stringify(res.errors));
  }

  try {
    fs.writeFileSync(c.cacheFile, f.getToken());
  } catch (e) {
    console.log(e);
  }
};

const main2 = async () => {
  try {
    f.setToken(fs.readFileSync(c.cacheFile, 'utf8'));
  } catch (e) {
    console.log('a');
  }
};

main2();
