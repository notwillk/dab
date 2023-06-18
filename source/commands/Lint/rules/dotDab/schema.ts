import { createSchema } from 'ts-json-validator';

const version = createSchema({ type: "string", enum: ["v0"] as const });

const schema = createSchema({
    type: "object",
    properties: {
        version,
    },
    required: ["version"],
});

export default schema;
