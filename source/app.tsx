import React from 'react';
import {Text} from 'ink';

type Props = {
	name: string | undefined;
};

export default function App({name = 'Stranger'}: Props) {
	return (
		<Text>
			Hello, <Text color="yellow">{name}</Text>
		</Text>
	);
}
