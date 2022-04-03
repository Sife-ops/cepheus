import type { Arguments, CommandBuilder } from 'yargs';

type Options = {
  word: string;
  upper: boolean | undefined;
};

export const command: string = 'test <word>';
export const desc: string = 'test <word> command';

export const builder: CommandBuilder<Options, Options> = (yargs) => {
  return yargs
    .options({
      upper: { type: 'boolean' },
    })
    .positional('word', { type: 'string', demandOption: true });
};

export const handler = (argv: Arguments<Options>): void => {
  const { word, upper } = argv;
  process.stdout.write(upper ? word.toUpperCase() : word);
  process.exit(0);
};
