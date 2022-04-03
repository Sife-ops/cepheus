#!/usr/bin/env node

import fetch from 'cross-fetch';
import fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const loginMutation = `
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    accessToken
  }
}
`;

const url = 'https://bookmarks.wyattgoettsch.com/api/graphql';
// const url = "http://localhost:4000/graphql";

// todo: xdg spec
let token = '';
const tokenCache = `${process.env.HOME}/.cepheus`;

try {
  token = fs.readFileSync(tokenCache, 'utf8');
} catch {
  console.log('no token cache');
}

const fetchGql = async (query: string, variables: {}) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return await res.json();
};

const main = async () => {
  const res = await fetchGql(loginMutation, {
    // username: "",
    // password: "",
  });

  if (res.errors) {
    throw new Error(JSON.stringify(res.errors));
  }

  console.log(res.data.login.accessToken);
  token = res.data.login.accessToken;

  try {
    fs.writeFileSync(tokenCache, token);
  } catch (e) {
    console.log(e);
  }
};

const main2 = async () => {
  try {
    token = fs.readFileSync(tokenCache, 'utf8');
  } catch (e) {
    console.log('a');
  }

  console.log(token);
  console.log(process.env.HOME);
};

main2();

// yargs(hideBin(process.argv))
//   .commandDir("commands")
//   .strict()
//   .alias({ h: "help" }).argv;
