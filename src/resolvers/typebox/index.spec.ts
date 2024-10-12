import { describe, expect, it } from 'vitest';
import { Type } from '@sinclair/typebox';

import { rv } from '../../index';

import { resolver } from './resolver';

describe('TypeBox Resolver', () => {
	it('resolver core schema to typebox validator', () => {
		const coreSchema = rv.object({
			name: rv.required(rv.string(), { description: 'description test' }),
			age: rv.optional(rv.number()),
			isActive: rv.boolean(),
			other: rv.object({
				name: rv.string(),
				age: rv.number(),
			}),
			hobbies: rv.array(rv.string()),
			cities: rv.tuple([rv.string(), rv.number()]),
			date: rv.or(rv.date(), rv.string()),
		});

		const typeBoxSchema = Type.Object({
			name: Type.Required(Type.String(), { description: 'description test' }),
			age: Type.Optional(Type.Number()),
			isActive: Type.Boolean(),
			other: Type.Object({
				name: Type.String(),
				age: Type.Number(),
			}),
			hobbies: Type.Array(Type.String()),
			cities: Type.Tuple([Type.String(), Type.Number()]),
			date: Type.Union([Type.Date(), Type.String()]),
		});

		const resolvedTypeBox = resolver(coreSchema);

		expect(resolvedTypeBox).toEqual(typeBoxSchema);
	});
});
