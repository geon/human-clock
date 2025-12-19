import { parseDigit } from "./parseDigit";
import { parseMonad } from "./parseMonad";
import { parseOneOrMore } from "./parseSome";

export const parseNumber = parseMonad(
	parseOneOrMore(parseDigit(10)),
	(parsed, { result }) => result(parseInt(parsed.join(""))),
);
