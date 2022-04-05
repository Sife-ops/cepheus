import * as r from '../graphql/request';
import * as t from '../utility/type';
import type { Arguments, CommandBuilder } from 'yargs';
import { fetchGql } from '../utility/function';
import { tokenWrapper } from '../utility/function';

export const command = 'add <entity> <json>';
export const desc = 'manage entities';

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
  const json = JSON.parse(argv.json);

  let decoded;
  let response;

  // todo: don't use switch
  switch (argv.entity) {
    case 'bookmark':
      decoded = t.BookmarkInput.decode(json);

      if (decoded._tag === 'Left') {
        throw new Error('Bookmark add input validation error.');
      }

      response = await fetchGql(r.bookmarkAddMutation, decoded.right);

      decoded = t.Bookmark.decode(response.data.bookmarkAdd);

      if (decoded._tag === 'Left') {
        throw new Error('Bookmark add mutation response validation error.');
      }

      console.log(decoded.right);

      break;

    case 'category':
      decoded = t.Category.decode(json);

      if (decoded._tag === 'Left') {
        throw new Error('Category add input validation error.');
      }

      response = await fetchGql(r.categoryAddMutation, decoded.right);

      decoded = t.Category.decode(response.data.categoryAdd);

      if (decoded._tag === 'Left') {
        throw new Error('Category add mutation response validation error.');
      }

      console.log(decoded.right);

      break;

    default:
      // todo: show help
      console.log('Invalid entity option.');

      break;
  }
});
