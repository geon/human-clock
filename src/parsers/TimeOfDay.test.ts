import { testExamples } from "../parser-combinators/testExamples.js";
import { createParseResult } from "../parser-combinators/Parser.js";
import { parseTimeOfDay } from "./TimeOfDay.js";

testExamples("parseTimeOfDay", [
	{
		input: "not a TimeOfDay",
		parser: parseTimeOfDay,
		result: 0,
	},
	{
		input: "21",
		parser: parseTimeOfDay,
		result: createParseResult(2, { hour: 21, minute: 0 }),
	},
	{
		input: "09:30",
		parser: parseTimeOfDay,
		result: createParseResult(5, { hour: 9, minute: 30 }),
	},
]);
