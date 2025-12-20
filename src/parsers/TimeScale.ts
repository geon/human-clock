import { parseKeyed } from "../parser-combinators/parseKeyed";
import { parseSemanticTimeSpan } from "./SemanticTimeSpan";

const parseTimeScaleFragment = parseKeyed({
	span: parseSemanticTimeSpan,
});

export const parseTimeScale = parseTimeScaleFragment;
