import { assert, expect, suite, test } from "vitest";
import {
	createParseError,
	parsingFailed,
	type ParseError,
	type Parser,
	type ParseResult,
} from "./Parser.js";

export type Example<T> = Readonly<{
	name?: string;
	parser: Parser<T>;
	input: string;
	fromIndex?: number;
	result: ParseResult<T> | number;
}>;

export function testExamples<T>(
	suiteName: string,
	examples: Readonly<Example<T>[]>,
) {
	suite(suiteName, () => {
		for (const example of examples) {
			test(example.name ?? example.input, () => {
				const parsed = example.parser(example.input, example.fromIndex ?? 0);

				if (typeof example.result === "number") {
					if (!parsingFailed(parsed)) {
						assert.fail(
							formatError(
								createParseError(example.result, "Parsing should have failed."),
								example.input,
							),
						);
					} else {
						expect(parsed).toHaveProperty("fromIndex", example.result);
					}
				} else {
					if (parsingFailed(parsed) && example.result.type !== "error") {
						assert.fail(formatError(parsed, example.input));
					} else {
						expect(parsed).toStrictEqual(example.result);
					}
				}
			});
		}
	});
}

function formatError(parsed: ParseError, input: string): string {
	const charNumber = parsed.fromIndex + 1;
	const arrow =
		Array.from(
			{
				length: parsed.fromIndex,
			},
			() => " ",
		).join("") + "^";

	return `Parse Error on char ${charNumber}.

Input:
${input}
${arrow}

Message:
${parsed.message}
`;
}
