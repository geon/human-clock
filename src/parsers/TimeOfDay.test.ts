import { testExamples } from "../parser-combinators/testExamples.js";
import { parseTimeOfDay } from "./TimeOfDay.js";

testExamples("parseTimeOfDay", [
	{
		input: "not a TimeOfDay",
		parser: parseTimeOfDay,
		result: 0,
	},
]);
