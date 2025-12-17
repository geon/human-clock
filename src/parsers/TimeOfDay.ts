import { parseMonad } from "../parser-combinators/parseMonad";
import { parseHour } from "./Hour";

export type TimeOfDay = {
	readonly hour: number;
	readonly minute: number;
};

export const parseTimeOfDay = parseMonad(parseHour, (hour, { result }) =>
	result({ hour, minute: 0 }),
);
