import { Type } from '@sinclair/typebox';

import type { StringOptions, TString } from '@sinclair/typebox';
import type { RVString, RVStringParams } from '@/types/string';

export function string(params?: RVStringParams): RVString & TString {
	const typeBoxParams: StringOptions = {};

	if (params?.min) {
		typeBoxParams.minLength = params.min;
	}

	if (params?.max) {
		typeBoxParams.maxLength = params.max;
	}

	if (params?.format) {
		typeBoxParams.format = params.format;
	}

	if (params?.regex) {
		typeBoxParams.format = 'regex';
		typeBoxParams.pattern = params.regex;
	}

	const resolved = Type.String(typeBoxParams);

	return {
		rv_type: 'string',
		...resolved,
	} as never;
}
