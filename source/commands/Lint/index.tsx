import React, { useEffect } from "react";
import {Text, useApp} from 'ink';
import { CommandProps } from "../index.js";
import usePromise from "react-promise-suspense";
import { isOk, isString } from "./Validator.js";
import rules from "./rules/index.js";
import CONTEXT from "./rules/context.js";

function LintOk() {
    return <Text>Lint OK</Text>;
}

function LintError({failure}: {failure:string}) {
    return <Text>Failed: {failure}</Text>;
}

export default function Lint({ flags }: CommandProps) {
    const results = usePromise(rules.validate, [{ ...CONTEXT, fix: Boolean(flags.fix) }]);
    const {exit} = useApp();

    useEffect(() => {
        if(!isOk(results)) {
            const resultsArray = isString(results) ? [results] : results;
            exit(new Error(['Failed:', ...resultsArray].join('\n')));
            process.exit(1);
        }
    }, [results]);

    return (
        isOk(results) ? <LintOk /> : <>{(isString(results) ? [results] : results).map(result => <LintError failure={result} key={result} />)}</>
    )
}
