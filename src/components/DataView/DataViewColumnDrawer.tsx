import React from "react";

import Drawer from "@root/components/Drawer";
import DataViewColumnDrawerContent from "./DataViewColumnDrawerContent";
import { DataViewProps } from "./DataViewTypes";

interface DataViewColumnDrawerProps {
	open?: boolean;
	onClose?: () => void;
	columns?: DataViewProps["columns"];
	allColumns?: DataViewProps["columns"];
	onChange?: DataViewProps["onColumnsChange"];
}

function DataViewColumnDrawer(props: DataViewColumnDrawerProps) {
	return (
		<Drawer
			open={props.open}
			onClose={props.onClose}
		>
			<DataViewColumnDrawerContent
				columns={props.columns}
				allColumns={props.allColumns}
				onChange={props.onChange}
				onClose={props.onClose}
			/>
		</Drawer>
	)
}

export default DataViewColumnDrawer;
