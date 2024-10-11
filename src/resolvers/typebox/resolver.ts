import { isObject } from '@/core/utils';

import { TBString } from './string';
import { TBObject } from './object';
import { TBNumber } from './number';
import { TBOptional } from './optional';
import { TBBoolean } from './boolean';
import { TBDate } from './date';
import { TBArray } from './array';
import { TBTuple } from './tuple';
import { TBRequired } from './required';

import type { TArray, TObject, TSchema } from '@sinclair/typebox';
import type { RVParams } from '@/types/params';
import type { RVTypes } from '@/types/helpers';
import type { RVSchema } from '@/types/schema';
type PrimitiveSchema = {
	type: RVTypes;
	schema?: RVSchema;
	schemas?: RVSchema[];
	params?: RVParams;
	optional?: boolean;
};

type ResolverObjectSchema = {
	type: 'object';
	schema: { [key: string]: PrimitiveSchema };
};

function resolverPrimitiveSchema(
	options: PrimitiveSchema,
): TSchema | undefined {
	if (options.type === 'string') {
		return TBString(options.params);
	}

	if (options.type === 'number') {
		return TBNumber(options.params);
	}

	if (options.type === 'boolean') {
		return TBBoolean();
	}

	if (options.type === 'date') {
		return TBDate();
	}

	if (options.type === 'array') {
		return TBArray(
			resolverPrimitiveSchema(options.schema as PrimitiveSchema) as TArray,
		);
	}

	if (options.type === 'tuple') {
		const tuplePrimitiveResolved = options.schemas?.map((schema) =>
			resolverPrimitiveSchema(schema as PrimitiveSchema),
		);
		return TBTuple(tuplePrimitiveResolved as TSchema[]);
	}

	if (options.type === 'object') {
		return resolverObjectSchema(
			options as unknown as ResolverObjectSchema,
		) as TObject;
	}

	if (options.type === 'optional') {
		return TBOptional(
			resolverPrimitiveSchema(options.schema as PrimitiveSchema) as TSchema,
		);
	}

	if (options.type === 'required') {
		return TBRequired(
			resolverPrimitiveSchema(options.schema as PrimitiveSchema) as TSchema,
			options.params,
		);
	}
}

function resolverObjectSchema(schema: ResolverObjectSchema) {
	if (schema.type === 'object') {
		const resolvedTypeBox = {} as TObject;

		const primitiveSchema = schema.schema;

		for (const key in primitiveSchema) {
			const value = primitiveSchema[key];

			resolvedTypeBox[key] = resolverPrimitiveSchema(value);
		}

		return TBObject(resolvedTypeBox);
	}
}

export function resolver(schema: RVSchema) {
	if (isObject(schema)) {
		return resolverObjectSchema(schema as ResolverObjectSchema);
	}

	return resolverPrimitiveSchema(schema as PrimitiveSchema);
}
