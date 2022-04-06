import * as e from '../utility/error';
import * as r from '../graphql/request';
import * as t from '../utility/type';
import type { Arguments, CommandBuilder } from 'yargs';
import { fetchGql } from '../utility/function';
import { tokenWrapper } from '../utility/function';

export const command = 'delete <entity> <json>';
export const desc = 'delete entities';

export const builder: CommandBuilder = (yargs) => {
  return yargs
    .positional('entity', {
      describe: 'type of entity to delete',
      type: 'string',
      demandOption: true,
    })
    .positional('json', {
      describe: 'entity object',
      type: 'string',
      demandOption: true,
    });
};

export const handler = tokenWrapper(async (argv: Arguments<t.MutationOptions>) => {
  const { entity } = argv;
  if (entity !== 'bookmark' && entity !== 'category') {
    throw e.invalidEntityInputError;
  }

  const request =
    entity === 'bookmark'
      ? //
        r.bookmarkDeleteMutation
      : r.categoryDeleteMutation;

  const json = JSON.parse(argv.json);

  const decodedInput = t.DeleteInput.decode(json);

  if (decodedInput._tag === 'Left') {
    throw new Error(`${entity} input validation error`);
  }

  const response = await fetchGql(request, decodedInput.right);

  const decodedResponse =
    entity === 'bookmark'
      ? t.BookmarkQueryResponse.decode(response.data.bookmarkDelete)
      : t.CategoryQueryResponse.decode(response.data.categoryDelete);

  if (decodedResponse._tag === 'Left') {
    throw new Error(`${entity} delete mutation response validation error`);
  }

  console.log(decodedResponse.right);
});
