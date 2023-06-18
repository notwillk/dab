import meow, { Result } from "meow";

const FLAGS = {
    fix: {
        type: 'boolean',
    },
} as const;

export type CommandLineOptions = Result<typeof FLAGS>;
export type Flags = CommandLineOptions['flags'];

const cli = meow(
	`
	Usage
	  $ dab [command]

	Options
		--fix boolean

	Examples
	  $ dab lint --fix
`,
	{
		importMeta: import.meta,
		flags: FLAGS,
	},
);

export default cli;
