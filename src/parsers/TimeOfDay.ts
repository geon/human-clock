import { parseChar } from "../parser-combinators/parseChar";
import { parseMonad } from "../parser-combinators/parseMonad";
import { parseOptional } from "../parser-combinators/parseOptional";
import { parseSequence } from "../parser-combinators/parseSequence";
import { parseSequenceIndex } from "../parser-combinators/parseSequenceIndex";
import { parseHour } from "./Hour";
import { parseMinute } from "./Minute";

export type TimeOfDay = {
	readonly hour: number;
	readonly minute: number;
};

export const parseTimeOfDay = parseMonad(
	parseSequence([
		parseHour,
		parseOptional(parseSequenceIndex(1, [parseChar(":"), parseMinute])),
	]),
	([hour, minute], { result }) => result({ hour, minute: minute ?? 0 }),
);
