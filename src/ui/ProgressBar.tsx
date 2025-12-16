import { JSX } from "react";
import cssModule from "./ProgressBar.module.css";
import { stylize } from "./stylize.js";

const style = stylize(cssModule, "progressBar");

export function ProgressBar(props: {
	readonly title: string;
	readonly completed: number;
}): JSX.Element {
	const percent = props.completed * 100;
	return (
		<progress
			className={style()}
			title={props.title}
			value={percent}
			style={{
				["--attr-value-workaround" as string]: percent.toFixed(4) + "%",
			}}
			max="100"
		>
			{props.title}: {Math.round(percent)} %
		</progress>
	);
}
