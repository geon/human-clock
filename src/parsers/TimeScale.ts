import { parseEof } from "../parser-combinators/parseEof";
import { parseKeyed } from "../parser-combinators/parseKeyed";
import { parseLookahead } from "../parser-combinators/parseLookahead";
import { parseSequenceIndex } from "../parser-combinators/parseSequenceIndex";
import { parseSemanticTimeSpan } from "./SemanticTimeSpan";

const parseTimeScaleFragment = parseKeyed({
	span: parseSemanticTimeSpan,
});

export const parseTimeScale = parseSequenceIndex(0, [
	parseTimeScaleFragment,
	parseLookahead(parseEof),
]);
