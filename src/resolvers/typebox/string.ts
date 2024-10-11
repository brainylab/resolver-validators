import { Type } from '@sinclair/typebox';

import type { StringOptions, TString } from '@sinclair/typebox';
import type { RVStringParams } from '@/types/string';

export function TBString(params?: RVStringParams): TString {
	const typeBoxParams: StringOptions = {};

	const keys: { [key in keyof RVStringParams]: string } = {
		min: 'minLength',
		max: 'maxLength',
		format: 'format',
		pattern: 'pattern',
		description: 'description',
	};

	if (params) {
		for (const key in keys) {
			const mappedKey = keys[key as keyof typeof keys] as keyof RVStringParams;
			if (params[key as keyof RVStringParams] !== undefined) {
				typeBoxParams[mappedKey] = params[key as keyof RVStringParams];
			}
		}
	}

	return Type.String(typeBoxParams);
}
