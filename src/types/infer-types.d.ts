export type InferTypes<T extends RVSchema, P extends unknown[] = []> = (T & {
	params: P;
})['infer'];
