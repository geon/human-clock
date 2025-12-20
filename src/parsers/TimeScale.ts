import { parseAlternatives } from "../parser-combinators/parseAlternatives";
import { parseChar } from "../parser-combinators/parseChar";
import { parseEof } from "../parser-combinators/parseEof";
import { parseKeyed } from "../parser-combinators/parseKeyed";
import { parseLookahead } from "../parser-combinators/parseLookahead";
import { parseMonad } from "../parser-combinators/parseMonad";
import { parseOptional } from "../parser-combinators/parseOptional";
import { Parser, ParserArgs } from "../parser-combinators/Parser";
import { parseSequence } from "../parser-combinators/parseSequence";
import { parseSequenceIndex } from "../parser-combinators/parseSequenceIndex";
import { parseWhitespace } from "../parser-combinators/parseWhitespace";
import { parseWithSeparator } from "../parser-combinators/parseWithSeparator";
import { parseSemanticTimeSpan, SemanticTimeSpan } from "./SemanticTimeSpan";

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
	parseAlternatives([
		parseParenthesisWrapper,
		parseKeyed({
			span: parseSemanticTimeSpan,
		}),
	]),
	parseChar(" "),
);

const parseUnion = parseTwoOrMoreWithSeparator(
	parseAlternatives([
		parseParenthesisWrapper,
		parseKeyed({
			intersection: parseIntersection,
			span: parseSemanticTimeSpan,
		}),
	]),
	parseSequence([
		parseOptional(parseWhitespace),
		parseChar(","),
		parseOptional(parseWhitespace),
	]),
);

type TimeScale =
	| {
			readonly type: "union";
			readonly value: readonly TimeScale[];
	  }
	| {
			readonly type: "intersection";
			readonly value: readonly TimeScale[];
	  }
	| {
			readonly type: "span";
			readonly value: SemanticTimeSpan;
	  };

const parseTimeScaleFragment: Parser<TimeScale> = parseAlternatives([
	parseParenthesisWrapper,
	parseKeyed({
		intersection: parseIntersection,
		union: parseUnion,
		span: parseSemanticTimeSpan,
	}),
]);

export const parseTimeScale = parseSequenceIndex(0, [
	parseTimeScaleFragment,
	parseLookahead(parseEof),
]);

const parseParenthesis = parseSequenceIndex(1, [
	parseChar("("),
	parseTimeScaleFragment,
	parseChar(")"),
]);
function parseParenthesisWrapper(...args: ParserArgs) {
	return parseParenthesis(...args);
}
