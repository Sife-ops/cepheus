import fetch from 'cross-fetch';
import util from 'util';
import { url } from './constant';

export const fetchGql = async (query: string, variables?: {}) => {
  const res = await fetch(`${url}/graphql`, {
    method: 'POST',
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!res.ok) {
    throw new Error(
      `HTTP error: ${{ status: res.status, statusText: res.statusText }}`
    );
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json;
};

export const tokenWrapper = (handler: (argv: any) => void) => {
  if (getToken() === '') {
    return () => {
      console.log('You need to log in first.');
    };
  }
  return handler;
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

let accessToken = '';

export const getToken = () => accessToken;

export const setToken = (s: string) => {
  accessToken = s;
};
