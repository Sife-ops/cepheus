import * as e from '../utility/error';
import * as r from '../graphql/request';
import * as t from '../utility/type';
import type { Arguments, CommandBuilder } from 'yargs';
import { fetchGql } from '../utility/function';
import { tokenWrapper } from '../utility/function';

export const command = 'update <entity> <json>';
export const desc = 'update entities';

export const builder: CommandBuilder = (yargs) => {
  return yargs
    .positional('entity', {
      describe: 'type of entity to update',
      type: 'string',
      demandOption: true,
    })
    .positional('json', {
      describe: 'entity object',
      type: 'string',
      demandOption: true,
    });
};

export const handler = tokenWrapper(
  async (argv: Arguments<t.MutationOptions>) => {
    const { entity } = argv;
    if (entity !== 'bookmark' && entity !== 'category') {
      throw e.invalidEntityInputError;
    }

    const json = JSON.parse(argv.json);

    // todo: no feel like writing good code today
    let decodedInput: any;

    if (entity === 'bookmark') {
      decodedInput = t.BookmarkUpdateInput.decode(json);

      if (decodedInput._tag === 'Left') {
        // todo: move to 'error.ts'
        throw new Error(`${entity} input validation error`);
      }

      const { url, description, categoryIds } = decodedInput.right as {
        id: number;
        url: string;
        description: string;
        categoryIds: number[];
      };

      if (
        url === undefined &&
        description === undefined &&
        categoryIds === undefined
      ) {
        throw new Error(`${entity} input validation error`);
      }
    } else {
      decodedInput = t.CategoryUpdateInput.decode(json);

      if (decodedInput._tag === 'Left') {
        throw new Error(`${entity} input validation error`);
      }
    }

    const request =
      entity === 'bookmark'
        ? //
          r.bookmarkUpdateMutation
        : r.categoryUpdateMutation;

    const response = await fetchGql(request, decodedInput.right);

    const decodedResponse =
      entity === 'bookmark'
        ? t.BookmarkQueryResponse.decode(response.data.bookmarkUpdate)
        : t.CategoryQueryResponse.decode(response.data.categoryUpdate);

    if (decodedResponse._tag === 'Left') {
      throw new Error(`${entity} add mutation response validation error`);
    }

    console.log(decodedResponse.right);
  }
);
