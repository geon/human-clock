import { createParseResult } from "../parser-combinators/Parser.js";
import { testExamples } from "../parser-combinators/testExamples.js";
import { parseMinute } from "./Minute.js";

testExamples("parseMinute", [
	{
		input: "not an Minute",
		parser: parseMinute,
		result: 0,
	},
	{
		input: "45",
		parser: parseMinute,
		result: createParseResult(2, 45),
	},
	{
		input: "99",
		parser: parseMinute,
		result: 0,
	},
]);
