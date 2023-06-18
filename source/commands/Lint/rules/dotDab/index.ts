import JSON5 from 'json5'
import { TsjsonParser } from "ts-json-validator";
import Validator, { validateMultiple, OK } from "../../Validator.js";
import { Context } from '../context.js';
import defaultConfig from './default.js';
import schema from "./schema.js";

const FILENAME = '.dab';

const parser = new TsjsonParser(schema);

function parse(data: string) {
    try {
        const object = JSON5.parse(data);
        return Boolean(parser.validates(object));
    } catch (e) {
        return false;
    }
}

const DotDabExists: Validator<Context> = {
    name: 'dot-dab/exists',
    validate: function(context) {
        return context.home.file(FILENAME).then(() => OK, () => DotDabExists.name);
    },
    fix(context) {
        return new Promise(resolve => {
            context.home.createFile(FILENAME, defaultConfig);
            resolve();
        });
    }
};

const DotDabValidSchema: Validator<Context> = {
    name: 'dot-dab/valid-schema',
    validate(context) {
        return context.home.file(FILENAME).then(
            file => file.exists() ? file.data() : null
        ).then(
            data => data && parse(data) ? OK : DotDabValidSchema.name,
            () => DotDabValidSchema.name
        );
    }
};

// export default validateMultiple(DotDabExists, DotDabValidSchema);
export default validateMultiple(DotDabExists, DotDabValidSchema);
