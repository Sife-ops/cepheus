import * as r from '../graphql/request';
import * as t from '../utility/type';
import type { Arguments, CommandBuilder } from 'yargs';
import { fetchGql } from '../utility/function';
import { tokenWrapper } from '../utility/function';

// todo: overuse of the work 'entity'

export const command = 'add <entity> <json>';
export const desc = 'add entities';

export const builder: CommandBuilder = (yargs) => {
  return yargs
    .positional('entity', {
      describe: 'type of entity to add',
      type: 'string',
      demandOption: true,
    })
    .positional('json', {
      describe: 'entity object',
      type: 'string',
      demandOption: true,
    });
};

export const handler = tokenWrapper(async (argv: Arguments<t.AddOptions>) => {
  const { entity } = argv;
  // todo: validate options?
  // todo: wrapper?
  if (entity !== 'bookmark' && entity !== 'category') {
    // todo: show help
    throw new Error('invalid entity');
  }

  const request =
    entity === 'bookmark'
      ? //
        r.bookmarkAddMutation
      : r.categoryAddMutation;

  const json = JSON.parse(argv.json);

  const decodedInput =
    entity === 'bookmark'
      ? //
        t.BookmarkInput.decode(json)
      : t.Category.decode(json);

  if (decodedInput._tag === 'Left') {
    throw new Error(`${entity} input validation error`);
  }

  const response = await fetchGql(request, decodedInput.right);

  const decodedResponse =
    entity === 'bookmark'
      ? t.Bookmark.decode(response.data.bookmarkAdd)
      : t.Category.decode(response.data.categoryAdd);

  if (decodedResponse._tag === 'Left') {
    throw new Error(`${entity} add mutation response validation error`);
  }

  console.log(decodedResponse.right);
});
