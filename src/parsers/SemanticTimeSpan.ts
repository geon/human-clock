import { parseChar } from "../parser-combinators/parseChar";
import { parseKeyed } from "../parser-combinators/parseKeyed";
import { parseMonad } from "../parser-combinators/parseMonad";
import { Parser } from "../parser-combinators/Parser";
import { parseSequence } from "../parser-combinators/parseSequence";
import { parseDayOfWeek } from "./DayOfWeek";
import { parseMonth } from "./Month";
import { parseTimeOfDay } from "./TimeOfDay";

type Span<T> = {
	readonly start: T;
	readonly end: T;
};

function parseSpan<T>(parser: Parser<T>) {
	return parseMonad(
		parseSequence([parser, parseChar("-"), parser]),
		([start, , end], { result }) => result<Span<T>>({ start, end }),
	);
}

export const parseSemanticTimeSpan = parseKeyed({
	timeOfDaySpan: parseSpan(parseTimeOfDay),
	monthSpan: parseSpan(parseMonth),
	dayOfWeekSpan: parseSpan(parseDayOfWeek),
	month: parseMonth,
	dayOfWeek: parseDayOfWeek,
});
