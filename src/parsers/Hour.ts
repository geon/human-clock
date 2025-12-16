import { parseMonad } from "../parser-combinators/parseMonad.js";
import { parseNumber } from "../parser-combinators/parseNumber.js";

const validHours = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
	22, 23,
] as const;

export type Hour = (typeof validHours)[number];

const validHoursSet = new Set<number>(validHours);
function isValidHour(hour: number): hour is Hour {
	return validHoursSet.has(hour);
}

export const parseHour = parseMonad(parseNumber, (parsed, { result, error }) =>
	isValidHour(parsed)
		? result(parsed)
		: error(`${parsed} is not a valid hour.`),
);
