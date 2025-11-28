# @brainylab/resolver-validators

## Overview

This project's main objective is to resolve the schema for other validators so that we do not add attachment to a specific validator, thus resolving the core schema for `TypeBox`, `Zod` and others.

### Core Schema

```ts
import { rv } from '@brainylab/resolver-validators';
import type { SchemaType } from '@brainylab/resolver-validators';

const newSchema = rv.object({
	name: rv.string(),
	age: rv.optional(rv.number()),
	isActive: rv.boolean(),
	other: rv.object({
		mail: rv.string(),
		telephone: rv.number(),
	}),
	hobbies: rv.array(rv.string()),
	cities: rv.tuple([rv.string(), rv.number()]),
	date_birth: rv.date(),
});

// infer types
type SchemaType = InferTypes<typeof newSchema>;
// {
//     age?: number | undefined;
//     name: string;
//     isActive: boolean;
//     other: {
//         name: string;
//         age: number;
//     };
//     hobbies: string[];
//     cities: [string, number];
//     date: Date;
// }

//resolve to typebox

import { resolver } from '@brainylab/resolver-validators/typebox';

// `resolveToTypeBox` is instance resolved from TypeBox
const resolveToTypeBox = resolver(newSchema);

import { resolver } from '@brainylab/resolver-validators/zod';

// `resolveToZod` is instance resolved from Zod
const resolveToZod = resolver(newSchema);
```
