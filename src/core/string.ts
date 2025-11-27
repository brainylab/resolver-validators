import type { RVString, RVStringParams } from '@/types/string';

export function string(params?: RVStringParams): RVString {
	return {
		type: 'string',
		params,
	} as never;
}
