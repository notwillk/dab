import Directory from './Directory.js'

export default class HomeDirectory extends Directory {
    constructor() {
        const root = process.env['DAB_ROOT'] || process.env['HOME'];

        if(!root) {
            throw new Error("Cannot set root directory");
        }

        super(root);
    }
}
