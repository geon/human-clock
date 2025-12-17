import { testExamples } from "../parser-combinators/testExamples.js";
import { createParseResult } from "../parser-combinators/Parser.js";
import { parseSemanticTimeSpan } from "./SemanticTimeSpan.js";

testExamples("parseSemanticTimeSpan", [
	{
		input: "august-december",
		parser: parseSemanticTimeSpan,
		result: createParseResult(15, {
			type: "monthSpan",
			value: {
				start: "august",
				end: "december",
			},
		} as const),
	},
	{
		input: "monday",
		parser: parseSemanticTimeSpan,
		result: createParseResult(6, {
			type: "dayOfWeek",
			value: "monday",
		} as const),
	},
	{
		input: "9-17",
		parser: parseSemanticTimeSpan,
		result: createParseResult(4, {
			type: "timeOfDaySpan",
			value: {
				start: { hour: 9, minute: 0 },
				end: { hour: 17, minute: 0 },
			},
		} as const),
	},
]);
