import { parseChar } from "../parser-combinators/parseChar";
import { parseEof } from "../parser-combinators/parseEof";
import { parseKeyed } from "../parser-combinators/parseKeyed";
import { parseLookahead } from "../parser-combinators/parseLookahead";
import { parseMonad } from "../parser-combinators/parseMonad";
import { parseOptional } from "../parser-combinators/parseOptional";
import { Parser } from "../parser-combinators/Parser";
import { parseSequence } from "../parser-combinators/parseSequence";
import { parseSequenceIndex } from "../parser-combinators/parseSequenceIndex";
import { parseWhitespace } from "../parser-combinators/parseWhitespace";
import { parseWithSeparator } from "../parser-combinators/parseWithSeparator";
import { parseSemanticTimeSpan } from "./SemanticTimeSpan";

function parseTwoOrMoreWithSeparator<T>(
	parser: Parser<T>,
	separator: Parser<unknown>,
): Parser<readonly T[]> {
	return parseMonad(
		parseWithSeparator(parser, separator),
		(parsed, { result, error }) =>
			parsed.length < 2
				? error("Must have at least 2 elements.")
				: result(parsed),
	);
}

const parseIntersection = parseTwoOrMoreWithSeparator(
	parseKeyed({
		span: parseSemanticTimeSpan,
	}),
	parseChar(" "),
);

const parseUnion = parseTwoOrMoreWithSeparator(
	parseKeyed({
		intersection: parseIntersection,
		span: parseSemanticTimeSpan,
	}),
	parseSequence([
		parseOptional(parseWhitespace),
		parseChar(","),
		parseOptional(parseWhitespace),
	]),
);

const parseTimeScaleFragment = parseKeyed({
	intersection: parseIntersection,
	union: parseUnion,
	span: parseSemanticTimeSpan,
});

export const parseTimeScale = parseSequenceIndex(0, [
	parseTimeScaleFragment,
	parseLookahead(parseEof),
]);
