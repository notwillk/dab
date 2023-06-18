import React from "react";
import {Text} from 'ink';

type CommandMissingProps = {
    command?: string;
}

export default function CommandMissing({ command }: CommandMissingProps) {
    const message = ['Unknown command', command].filter(Boolean).join(': ')
    return <Text>{message}</Text>;
}
