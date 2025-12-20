import { testExamples } from "../parser-combinators/testExamples.js";
import { parseTimeScale } from "./TimeScale.js";

testExamples("parseTimeScale", [
	{
		input: "not a TimeScale",
		parser: parseTimeScale,
		result: 0,
	},
]);
