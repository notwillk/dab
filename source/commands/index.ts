import {FC} from 'react';
import { Flags } from "../cli.js";
import Git from './Git.js';
import Lint from './Lint/index.js';

export type CommandProps = {flags: Flags};

const COMMANDS: Record<string, FC<CommandProps>> = {
    lint: Lint,
    git: Git,
};

export default COMMANDS;