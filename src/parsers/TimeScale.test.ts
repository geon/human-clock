import { createParseResult } from "../parser-combinators/Parser.js";
import { testExamples } from "../parser-combinators/testExamples.js";
import { parseTimeScale } from "./TimeScale.js";

testExamples("parseTimeScale", [
	{
		input: "not a TimeScale",
		parser: parseTimeScale,
		result: 0,
	},
	{
		input: "monday",
		parser: parseTimeScale,
		result: createParseResult(6, {
			type: "span",
			value: {
				type: "dayOfWeek",
				value: "monday",
			},
		} as const),
	},
	{
		input: "monday garbage",
		parser: parseTimeScale,
		result: 6,
	},
	{
		input: "january monday",
		parser: parseTimeScale,
		result: createParseResult(14, {
			type: "intersection",
			value: [
				{
					type: "span",
					value: {
						type: "month",
						value: "january",
					},
				},
				{
					type: "span",
					value: {
						type: "dayOfWeek",
						value: "monday",
					},
				},
			],
		} as const),
	},
	{
		input: "monday, thursday",
		parser: parseTimeScale,
		result: createParseResult(16, {
			type: "union",
			value: [
				{
					type: "span",
					value: {
						type: "dayOfWeek",
						value: "monday",
					},
				},
				{
					type: "span",
					value: {
						type: "dayOfWeek",
						value: "thursday",
					},
				},
			],
		} as const),
	},
	{
		input: "monday, thursday 06-22",
		parser: parseTimeScale,
		result: createParseResult(22, {
			type: "union",
			value: [
				{
					type: "span",
					value: {
						type: "dayOfWeek",
						value: "monday",
					},
				},
				{
					type: "intersection",
					value: [
						{
							type: "span",
							value: {
								type: "dayOfWeek",
								value: "thursday",
							},
						},
						{
							type: "span",
							value: {
								type: "timeOfDaySpan",
								value: {
									end: {
										hour: 22,
										minute: 0,
									},
									start: {
										hour: 6,
										minute: 0,
									},
								},
							},
						},
					],
				},
			],
		} as const),
	},
	{
		input: "(january)",
		parser: parseTimeScale,
		result: createParseResult(9, {
			type: "span",
			value: {
				type: "month",
				value: "january",
			},
		} as const),
	},
]);
