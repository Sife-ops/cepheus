import * as r from '../graphql/request';
import type { Arguments, CommandBuilder } from 'yargs';
import { fetchGql } from '../utility/function';

export const command = 'add <entity> <json>';
export const desc = 'manage entities';

interface Options {
  entity: 'bookmark' | 'category';
  json: string;
}

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

export const handler = async (argv: Arguments<Options>) => {
  const json = JSON.parse(argv.json);

  // todo: validate with io-ts or joi???

  let res;

  switch (argv.entity) {
    case 'bookmark':
      res = await fetchGql(r.bookmarkAddMutation, json);
      console.log(res.data.bookmarkAdd);
      break;
    case 'category':
      res = await fetchGql(r.categoryAddMutation, json);
      console.log(res.data.categoryAdd);
      break;
    default:
      console.log('Invalid entity.');
      break;
  }
};
