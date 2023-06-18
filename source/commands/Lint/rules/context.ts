import HomeDirectory from '../../../models/HomeDirectory.js';

const CONTEXT = {
    home: new HomeDirectory(),
    fix: false as boolean,
} as const;

export type Context = typeof CONTEXT;

export default CONTEXT;
