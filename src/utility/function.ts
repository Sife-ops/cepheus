import * as c from './constant';
import * as j from 'jsonwebtoken';
import fetch from 'cross-fetch';
import fs from 'fs';
import util from 'util';
import { url } from './constant';

let accessToken = '';

export const getAccessToken = () => accessToken;

export const setAccessToken = (s: string) => {
  accessToken = s;
};

export const tokenWrapper = (handler: (argv: any) => void) => {
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

    setAccessToken(accessToken);
  } catch (e) {
    // todo: console.log all errors?
    return () => {
      console.log('You need to log in first.');
    };
  }

  // todo: add try-catch?
  if (getAccessToken().length > 0) {
    fetch(`${c.url}/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        authorization: getAccessToken(),
      },
    }).then(async (res) => {
      if (!res.ok) {
        console.log('refresh failed');
        return;
      }
      const data = await res.json();
      fs.writeFileSync(c.cacheFile, data.accessToken);
    });
  }

  return handler;
};

export const fetchGql = async (query: string, variables?: {}) => {
  const res = await fetch(`${url}/graphql`, {
    method: 'POST',
    headers: {
      Authorization: getAccessToken(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!res.ok) {
    throw new Error(
      `HTTP error: ${JSON.stringify({
        status: res.status,
        statusText: res.statusText,
      })}`
    );
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json;
};

export const logger = (o: any) => {
  console.log(
    util.inspect(o, {
      showHidden: false,
      depth: null,
      colors: true,
    })
  );
};
