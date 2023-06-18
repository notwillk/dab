#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import App from './app.js';
import cli from './cli.js';

render(<App cli={cli} />);
