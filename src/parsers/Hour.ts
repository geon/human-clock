import { parseMonad } from "../parser-combinators/parseMonad.js";
import { parseNumber } from "../parser-combinators/parseNumber.js";

export type Hour = number;

export const parseHour = parseMonad(parseNumber, (parsed, { result }) =>
	result(parsed),
);
