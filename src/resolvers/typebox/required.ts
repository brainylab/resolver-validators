import { Type } from '@sinclair/typebox';

import type { RVRequiredParams } from '@/types/required';
import type { SchemaOptions, TSchema } from '@sinclair/typebox';

export function TBRequired(
	schema: TSchema,
	params?: RVRequiredParams,
): TSchema {
	const typeBoxParams: SchemaOptions = {};

	const keys: { [key in keyof RVRequiredParams]: string } = {
		description: 'description',
	};

	if (params) {
		for (const key in keys) {
			const mappedKey = keys[
				key as keyof typeof keys
			] as keyof RVRequiredParams;
			if (params[key as keyof RVRequiredParams] !== undefined) {
				typeBoxParams[mappedKey] = params[key as keyof RVRequiredParams];
			}
		}
	}

	return Type.Required(schema as unknown as TSchema, typeBoxParams);
}
