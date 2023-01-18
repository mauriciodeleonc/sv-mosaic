import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

import theme from "@root/theme";

interface SpinnerProps {
	className?: string;
	progress?: number;
}

function Spinner(props: SpinnerProps) {
	return (
		<CircularProgress style={{ color : theme.colors.blue }} size={30} className={props.className} value={props.progress ?? undefined} />
	)
}

export default Spinner;
