import { createParseResult } from "../parser-combinators/Parser.js";
import { testExamples } from "../parser-combinators/testExamples.js";
import { parseHour } from "./Hour.js";

testExamples("parseHour", [
	{
		input: "not an Hour",
		parser: parseHour,
		result: 0,
	},
	{
		input: "21",
		parser: parseHour,
		result: createParseResult(2, 21),
	},
	{
		input: "25",
		parser: parseHour,
		result: 0,
	},
]);
