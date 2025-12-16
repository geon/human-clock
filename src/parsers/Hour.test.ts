import { testExamples } from "../parser-combinators/testExamples.js";
import { parseHour } from "./Hour.js";

testExamples("parseHour", [
	{
		input: "not an Hour",
		parser: parseHour,
		result: 0,
	},
]);
