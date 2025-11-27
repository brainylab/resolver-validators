import { Type } from '@sinclair/typebox';

import type { TArray } from '@sinclair/typebox';

export function TBArray(schema: TArray): TArray {
	return Type.Array(schema);
}
