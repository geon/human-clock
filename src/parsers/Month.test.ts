import { testExamples } from "../parser-combinators/testExamples.js";
import { createParseResult } from "../parser-combinators/Parser.js";
import { parseMonth } from "./Month.js";

testExamples("parseMonth", [
	{
		input: "febyouary is not a Month",
		parser: parseMonth,
		result: 0,
	},
	{
		input: "february is though",
		parser: parseMonth,
		result: createParseResult(8, "february"),
	},
]);
