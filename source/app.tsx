import React, { Suspense } from 'react';
import { CommandLineOptions } from './cli.js';
import COMMANDS from './commands/index.js';
import CommandMissing from './components/CommandMissing.js';

type Props = {
	cli: CommandLineOptions;
};

export default function App({cli}: Props) {
	const command = cli.input[0];
	const Component = command && COMMANDS[command];
	return (
		<Suspense>
			{Component ? <Component flags={cli.flags} /> : <CommandMissing command={command} />}
		</Suspense>
	);
}
