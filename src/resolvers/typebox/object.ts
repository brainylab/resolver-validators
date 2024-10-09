import { Type, type TObject } from '@sinclair/typebox';

export function TBObject(schema: TObject): TObject {
	return Type.Object(schema);
}
