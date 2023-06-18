export const OK = null;

export type ValidationResult = typeof OK | string | string[];

export function isOk(result: ValidationResult): result is typeof OK {
    return result === null;
}

export function isString(result: ValidationResult): result is string {
    return typeof result === 'string';
}

export function isStringArray(result: ValidationResult): result is string[] {
    return !isOk(result) && !isString(result);
}

export default interface Validator<T extends {}> {
    name: string | string[];
    validate: (context: T) => Promise<ValidationResult>;
    fix?: (context: T) => Promise<void>;
}

export function validateMultiple<T extends {}>(...validators: Validator<T>[]) {
    function fix(context: T) {
        return Promise.all(validators.map(
            validator => validator.fix ? validator.fix(context) : Promise.resolve()
        )).then(() => {});
    }

    function validate(context: T) {
        return Promise.all(validators.map(validator => validator.validate(context))).then(results => {
            const failed = results.reduce<string[]>((acc, result) => {
                if(isOk(result)) {
                    return acc;
                } else if(isString(result)) {
                    return [...acc, result];
                } else {
                    return [...acc, ...result];
                }
            },[]);

            const first = failed[0];

            if(!first) {
                return OK;  
            }
    
            if(failed.length === 1) {
                return first;
            }
    
            return failed;
        })

    }

    return {
        name: validators.flatMap(({name}) => name),
        validate,
        fix,
    }
}