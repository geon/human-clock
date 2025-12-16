import { Flex } from "./Flex";
import { ProgressBar } from "./ProgressBar";
import { stylize } from "./stylize";
import cssModule from "./App.module.css";
import { ComponentProps } from "react";

const style = stylize(cssModule, "base");

export function App() {
	const progressBars: readonly (ComponentProps<typeof ProgressBar> & {
		readonly id: string;
	})[] = [
		{
			id: "life",
			title: "Life",
			completed: 0.5,
		},
		{
			id: "workWeek",
			title: "Work Week",
			completed: 0.8,
		},
		{
			id: "sleep",
			title: "Sleep",
			completed: 0.1,
		},
	];

	return (
		<div className={style()}>
			<Flex col center style={{ height: "100%", fontSize: "2em" }}>
				{progressBars.map((props) => (
					<ProgressBar key={props.id} {...props} />
				))}
			</Flex>
		</div>
	);
}
