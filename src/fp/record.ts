export function objectEntries<T extends Record<PropertyKey, unknown>>(
	obj: T,
): Exclude<
	{
		// Can't handle `| undefined` values, but handles Partial<Record<T>>  due to `Required<T>`.
		[K in keyof T]: [K, Required<T>[K]];
	}[keyof T],
	undefined
>[] {
	return Object.entries(obj) as ReturnType<typeof objectEntries<T>>;
}
