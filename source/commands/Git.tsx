import React from "react";
import {Text} from 'ink';
import { CommandProps } from "./index.js";

export default function Git({ flags }: CommandProps) {
    return (
        <Text>
            Git
            {JSON.stringify(flags, null,2)}
        </Text>
    )
}