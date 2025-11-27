import type { TDate } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

export function TBDate(): TDate {
	return Type.Date();
}
