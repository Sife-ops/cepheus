import * as e from '../utility/error';
import * as f from '../utility/function';
import * as r from '../graphql/request';
import * as t from '../utility/type';
import type { Arguments, CommandBuilder } from 'yargs';
import { fetchGql } from '../utility/function';
import { tokenWrapper } from '../utility/function';

export const command = 'get <entity>';
export const desc = 'get entities';

export const builder: CommandBuilder = (yargs) => {
  return yargs.positional('entity', {
    describe: 'type of entity to get',
    type: 'string',
    demandOption: true,
  });
};

export const handler = tokenWrapper(async (argv: Arguments<t.QueryOptions>) => {
  const { entity } = argv;
  if (entity !== 'bookmarks' && entity !== 'categories') {
    throw e.invalidEntityInputError;
  }

  const request =
    entity === 'bookmarks'
      ? //
        r.bookmarksQuery
      : r.categoriesQuery;

  const response = await fetchGql(request);

  const decoded =
    entity === 'bookmarks'
      ? t.BookmarksResponse.decode(response.data.bookmarks)
      : t.CategoriesResponse.decode(response.data.categories);

  if (decoded._tag === 'Left') {
    throw new Error(`${entity} response validation error`);
  }

  f.logger(decoded.right);
});
