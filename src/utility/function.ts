import { url } from './constant';

export const fetchGql = async (query: string, variables: {}) => {
  const res = await fetch(url, {
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

  return await res.json();
};

let accessToken = '';

export const getToken = () => accessToken;

export const setToken = (s: string) => {
  accessToken = s;
};
