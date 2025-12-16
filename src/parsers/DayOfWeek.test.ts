import { testExamples } from "../parser-combinators/testExamples.js";
import { createParseResult } from "../parser-combinators/Parser.js";
import { parseDayOfWeek } from "./DayOfWeek.js";

testExamples("parseDayOfWeek", [
	{
		input: "not a DayOfWeek",
		parser: parseDayOfWeek,
		result: 0,
	},
	{
		input: "friday is my day",
		parser: parseDayOfWeek,
		result: createParseResult(6, "friday"),
	},
]);
