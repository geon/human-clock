import { parseAlternatives } from "../parser-combinators/parseAlternatives";
import { parseString } from "../parser-combinators/parseString";

export const validDaysOfWeek = [
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
	"sunday",
] as const;

export type DayOfWeek = (typeof validDaysOfWeek)[number];

export const parseDayOfWeek = parseAlternatives(
	validDaysOfWeek.map(parseString),
);
