import { createParseResult } from "../parser-combinators/Parser.js";
import { testExamples } from "../parser-combinators/testExamples.js";
import { parseTimeScale } from "./TimeScale.js";

testExamples("parseTimeScale", [
	{
		input: "not a TimeScale",
		parser: parseTimeScale,
		result: 0,
	},
	{
		input: "monday",
		parser: parseTimeScale,
		result: createParseResult(6, {
			type: "span",
			value: {
				type: "dayOfWeek",
				value: "monday",
			},
		} as const),
	},
	{
		input: "monday garbage",
		parser: parseTimeScale,
		result: 6,
	},
]);
