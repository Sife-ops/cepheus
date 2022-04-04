import * as f from '../utility/function';
import * as r from '../graphql/request';

export const command = 'bookmarks';
export const desc = 'fetch bookmarks';

export const handler = f.tokenWrapper(async () => {
  const res = await f.fetchGql(r.bookmarksQuery);
  f.logger(res.data.bookmarks);
});
