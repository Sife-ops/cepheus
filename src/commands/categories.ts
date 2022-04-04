import * as f from '../utility/function';
import * as r from '../graphql/request';

export const command = 'categories';
export const desc = 'fetch categories';

export const handler = f.tokenWrapper(async () => {
  const res = await f.fetchGql(r.categoriesQuery);
  f.logger(res.data.categories);
});
