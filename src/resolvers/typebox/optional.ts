import { Type } from '@sinclair/typebox';

import type { TSchema } from '@sinclair/typebox';

export function TBOptional(schema: TSchema): TSchema {
	return Type.Optional(schema as unknown as TSchema);
}
