export function mapRecord<TKey extends string, TIn, TOut>(
	record: Readonly<Record<TKey, TIn>>,
	transform: (value: TIn, key: TKey) => TOut,
): Record<TKey, TOut> {
	return Object.fromEntries(
		Object.entries(record).map(([key, value]) => [
			key,
			transform(value as TIn, key as TKey),
		]),
	) as Readonly<Record<TKey, TOut>>;
}

// https://stackoverflow.com/questions/69019873/how-can-i-get-typed-object-entries-and-object-fromentries-in-typescript
export function objectFromEntries<
	const T extends ReadonlyArray<readonly [PropertyKey, unknown]>,
>(entries: T): { [K in T[number] as K[0]]: K[1] } {
	return Object.fromEntries(entries) as { [K in T[number] as K[0]]: K[1] };
}

export function objectEntries<T extends Record<PropertyKey, unknown>>(
	obj: T,
): Exclude<
	{
		// Can't handle `| undefined` values, but handles Partial<Record<T>>  due to `Requi
		[K in keyof T]: [K, Required<T>[K]];
	}[keyof T],
	undefined
>[] {
	return Object.entries(obj) as ReturnType<typeof objectEntries<T>>;
}
