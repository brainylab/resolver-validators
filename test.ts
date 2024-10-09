import { rv } from './src/typebox';

import type { InferTypes } from './src/typebox';

const newSchema = rv.object({
	name: rv.string(),
	age: rv.optional(rv.number()),
	isActive: rv.boolean(),
	other: rv.object({
		name: rv.string(),
		age: rv.number(),
	}),
	hobbies: rv.array(rv.string()),
	cities: rv.tuple([rv.string(), rv.number()]),
	date: rv.date(),
});

type SchemaType = InferTypes<typeof newSchema>;

const resolvedSchema: SchemaType = {
	name: 'John Doe',
	age: 30,
	isActive: true,
	other: {
		name: 'Jane Doe',
		age: 25,
	},
	hobbies: ['reading', 'gaming'],
	cities: ['New York', 12345],
	date: new Date(),
};

console.log(newSchema);
console.log(resolvedSchema);
