import { parseAlternatives } from "../parser-combinators/parseAlternatives";
import { parseString } from "../parser-combinators/parseString";

export const validMonths = [
	"january",
	"february",
	"march",
	"april",
	"may",
	"june",
	"july",
	"august",
	"september",
	"october",
	"november",
	"december",
] as const;

export type Month = (typeof validMonths)[number];

export const parseMonth = parseAlternatives(validMonths.map(parseString));
