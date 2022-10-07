import * as React from "react";
import { useState, useEffect, useCallback, ReactElement } from "react";
import styled from "styled-components";
import { boolean, select } from "@storybook/addon-knobs";

import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import JSONDB from "@root/utils/JSONDB";
import LocalStorageDB from "@root/utils/LocalStorageDB";
import rawData from "./rawData.json";
import categories from "./categories.json";
import MultiSelectHelper from "./MultiSelectHelper";
import {
	transform_boolean,
	transform_dateFormat,
	transform_get,
	transform_thumbnail,
	transform_mapGet,
	transform_join,
	DataViewFilterDate,
	DataViewFilterSingleSelect,
	DataView,
	DataViewProps,
	DataViewFilterText,
	DataViewFilterMultiselect,
	useMosaicSettings,
	MosaicContext,
	DataViewFilterDef
} from "../../../";
import { useStateRef } from "@root/utils/reactTools";
import SingleSelectHelper from "./SingleSelectHelper";

import "./DataViewKitchenSink.css";

// set an artificial delay of 500ms to simulate DB queries
const ARTIFICIAL_DELAY = 500;

const categoriesApi = new JSONDB(categories);
const viewsApi = new LocalStorageDB("views");

const mappedData = rawData.map(function (data) {
	// convert the date columns to dates, since they are ISOStrings in the file
	return {
		...data,
		created: data.created ? new Date(data.created) : undefined,
		updated: data.updated ? new Date(data.updated) : undefined
	}
})
const api = new JSONDB(mappedData, {
	relationships: [
		{
			api: categoriesApi,
			key: "categories",
			left_key: "categories_ids",
			right_key: "id"
		}
	]
});

const processStringFilter = function ({ name, data, output }) {
	if (data.value === undefined) { return; }

	if (data.comparison === "equals") {
		output[name] = data.value;
	} else if (data.comparison === "contains") {
		output[name] = { $contains: data.value };
	} else if (data.comparison === "not_contains") {
		output[name] = { $not_contains: data.value };
	} else if (data.comparison === "not_equals") {
		output[name] = { $ne: data.value };
	}
}

const processDateFilter = function ({ name, data, output }) {
	if (data.rangeStart === undefined && data.rangeEnd === undefined) { return; }

	const outputFilter = {};

	if (data.rangeStart !== undefined) {
		if (data.rangeStart instanceof Date !== true) { throw new Error("rangeStart is not a Date"); }
		outputFilter["$gte"] = data.rangeStart;
	}

	if (data.rangeEnd !== undefined) {
		if (data.rangeEnd instanceof Date !== true) { throw new Error("rangeEnd is not a Date"); }
		outputFilter["$lte"] = data.rangeEnd;
	}

	if (Object.keys(outputFilter).length > 0) {
		output[name] = outputFilter;
	}
}

const processArrayFilter = function ({ name, data, output }) {
	if (data.comparison === "exists") {
		output[name] = { $exists: true }
	} else if (data.comparison === "not_exists") {
		output[name] = { $exists: false }
	} else if (data.value === undefined || data.value.length === 0) {
		return;
	} else if (data.comparison === "in") {
		output[name] = { $in: data.value };
	} else if (data.comparison === "not_in") {
		output[name] = { $not_in: data.value };
	}
}

const processSingleSelectFilter = function ({ name, data, output }) {
	if (data.value === undefined) { return; }
	output[name] = { $in: [data.value] };
}

const categoriesHelper = new MultiSelectHelper({
	api: categoriesApi,
	labelColumn: "tag",
	valueColumn: "id",
	sortColumn: "sort_tag"
});

const singleSelectCategoriesHelper = new SingleSelectHelper({
	api: categoriesApi,
	labelColumn: "tag",
	valueColumn: "id",
	sortColumn: "sort_tag"
});

const filters: {
	name: DataViewFilterDef["name"];
	label: DataViewFilterDef["label"];
	type: DataViewFilterDef["type"];
	component: any;
	args?: DataViewFilterDef["args"];
	column?: DataViewFilterDef["column"];
	toFilter?: (val: {name: string; data: any; output: any}) => void;
}[] = [
	{
		name: "keyword",
		label: "Keyword",
		type: "primary",
		component: DataViewFilterText,
		column: "title",
		toFilter: function ({ name, data, output }) {
			processStringFilter({
				name,
				data: { value: data.value, comparison: "contains" },
				output
			});
		}
	},
	{
		name: "categories",
		label: "Categories",
		type: "primary",
		component: DataViewFilterMultiselect,
		args: {
			getOptions: categoriesHelper.getOptions.bind(categoriesHelper),
			getSelected: categoriesHelper.getSelected.bind(categoriesHelper),
		},
		column: "categories_ids",
		toFilter: processArrayFilter
	},
	{
		name: "single_select_category",
		label: "Single Select Category",
		type: "optional",
		component: DataViewFilterSingleSelect,
		args: {
			getOptions: singleSelectCategoriesHelper.getOptions.bind(singleSelectCategoriesHelper),
			getSelected: singleSelectCategoriesHelper.getSelected.bind(singleSelectCategoriesHelper)
		},
		column: "categories_ids",
		toFilter: processSingleSelectFilter
	},
	{
		name: "categories_with_comparisons",
		label: "Categories with Comparisons",
		type: "optional",
		component: DataViewFilterMultiselect,
		args: {
			getOptions: categoriesHelper.getOptions.bind(categoriesHelper),
			getSelected: categoriesHelper.getSelected.bind(categoriesHelper),
			comparisons: ["in", "not_in", "all", "exists", "not_exists"]
		},
		column: "categories_ids",
		toFilter: processArrayFilter
	},
	{
		name: "title",
		label: "Title",
		type: "optional",
		component: DataViewFilterText,
		toFilter: processStringFilter
	},
	{
		name: "created",
		label: "Created",
		type: "optional",
		component: DataViewFilterDate,
		toFilter: processDateFilter
	},
	{
		name: "updated",
		label: "Updated",
		type: "optional",
		component: DataViewFilterDate,
		toFilter: processDateFilter
	},
	{
		name: "title_with_comparisons",
		label: "Title with Comparisons",
		type: "optional",
		component: DataViewFilterText,
		toFilter: processStringFilter,
		column: "title",
		args: {
			comparisons: ["equals", "not_equals", "contains", "not_contains", "exists", "not_exists"]
		}
	}
]

const rootDefaultView: DataViewProps["savedView"] = {
	id: "default",
	label: "Default View",
	type: "default",
	state: {
		limit: 25,
		skip: 0,
		filter: {},
		sort: {
			name: "title",
			dir: "asc"
		},
		display: "list",
		activeFilters: [],
		activeColumns: ["image", "title", "categories", "created"]
	}
}

const listColumns = [
	{
		name: "id",
		label: "ID"
	},
	{
		name: "image",
		label: "Image",
		transforms: [
			transform_get(["resource_raw", "secure_url"]),
			transform_thumbnail({ width: 75, height: 75 })
		]
	},
	{
		name: "title",
		label: "Title",
		style: {
			bold: true
		},
		sortable: true
	},
	{
		name: "description",
		label: "Description"
	},
	{
		name: "content_owner",
		label: "Content Owner"
	},
	{
		name: "categories",
		label: "Categories",
		transforms: [
			transform_mapGet("tag"),
			transform_join()
		]
	},
	{
		name: "image_title",
		label: "Image Title",
		column: "image",
		transforms: [
			transform_get(["title"])
		]
	},
	{
		name: "image_notes",
		label: "Image Notes",
		column: "image",
		transforms: [
			transform_get(["notes"])
		]
	},
	{
		name: "image_deleted",
		label: "Image Deleted",
		column: "image",
		transforms: [
			transform_get(["deleted"]),
			transform_boolean()
		]
	},
	{
		name: "created",
		label: "Created",
		sortable: true,
		transforms: [
			transform_dateFormat()
		]
	},
	{
		name: "updated",
		label: "Updated",
		sortable: true,
		transforms: [
			transform_dateFormat()
		]
	},
	{
		name: "bold",
		label: "Style - bold",
		column: "content_owner",
		style: {
			bold: true
		}
	},
	{
		name: "italic",
		label: "Style - italic",
		column: "content_owner",
		style: {
			italic: true
		}
	},
	{
		name: "strike_through",
		label: "Style - strikeThrough",
		column: "content_owner",
		style: {
			strikeThrough: true
		}
	},
	{
		name: "noWrap",
		label: "Style - noWrap",
		column: "title",
		style: {
			noWrap: true
		}
	},
	{
		name: "ellipsis",
		label: "Style - ellipsis",
		column: "title",
		style: {
			noWrap: true,
			ellipsis: true,
			maxWidth: "100px"
		}
	},
	{
		name: "textTransform",
		label: "Style - textTransform",
		column: "content_owner",
		style: {
			textTransform: "uppercase"
		}
	}
];

const gridColumns = [
	...listColumns,
	{
		name: "image_grid",
		column: "image",
		label: "Image",
		transforms: [
			transform_get(["resource_raw", "secure_url"]),
			transform_thumbnail({ width: 275, height: 200 })
		]
	}
]

const gridColumnsMap = {
	image: "image_grid",
	primary: "title",
	secondary: "created"
}

const StyledDiv = styled.div`
	padding: 0px 16px;
	height: 100%;
`;

function DataViewKitchenSink(): ReactElement {
	const savedViewAllowSharedViewSave = boolean("savedViewAllowSharedViewSave", true);
	const bulkActions = boolean("bulkActions", true);
	const bulkAllActions = boolean("bulkAllActions", true);
	const primaryActions = boolean("primaryActions", true);
	const additionalActions = boolean("additionalActions", true);
	const primaryFilters = boolean("primaryFilters", true);
	const optionalFilters = boolean("optionalFilters", true);
	const sticky = boolean("sticky", true);
	const locale: string = select("locale", { en: "en", es: "es", cimode: "cimode", de: "de" }, "en");
	const comparisonDefault: string = select("ComparisonDefault for text filter", { "Equals": "equals", "Not Equals": "not_equals", "Contains": "contains", "Not Contains": "not_contains", "Exists": "exists", "Not Exists": "not_exists", "Invalid Comparison": "invalid_comparison" }, "contains");
	const displayList = boolean("displayList", true);
	const displayGrid = boolean("displayGrid", true);
	const validFilters = filters.filter(val => (val.type === "primary" && primaryFilters) || (val.type === "optional" && optionalFilters));
	const defaultView: DataViewProps["savedView"] = {
		...rootDefaultView,
		state: {
			...rootDefaultView.state,
			display: displayList ? "list" : displayGrid ? "grid" : undefined
		}
	}

	const [state, setState] = useState({
		data: [],
		count: 0,
		limit: 25,
		skip: 0,
		loading: false,
		savedView: defaultView,
		...defaultView.state
	});

	const mosaicSettings = useMosaicSettings();

	// If the user changes the locale knob we need to propagate to our i18n object
	useEffect(() => {
		if (mosaicSettings.i18n.language !== locale) {
			mosaicSettings.i18n.changeLanguage(locale);
		}
	}, [locale]);

	const stateRef = useStateRef(state);

	const filterChange = function (name, value) {
		setState({
			...state,
			filter: {
				...state.filter,
				[name]: value
			},
			skip: 0
		});
	}

	const convertFilter = function (filter) {
		const queryFilter = {};

		for (const filterObj of filters) {
			if (filter[filterObj.name] !== undefined) {
				filterObj.toFilter({
					name: filterObj.column || filterObj.name,
					data: filter[filterObj.name],
					output: queryFilter
				});
			}
		}

		return queryFilter;
	}

	// in order to support the sticky boolean we need to add a class to the html root
	// then we use the css off that class to apply the proper css to ensure the parent hierarchy will be correct for sticky mechanics
	useEffect(() => {
		if (sticky) {
			document.body.parentElement.classList.add("stickyHtml");
		} else {
			document.body.parentElement.classList.remove("stickyHtml");
		}

		return () => {
			document.body.parentElement.classList.remove("stickyHtml");
		}
	}, [sticky]);

	useEffect(() => {
		let isMounted = true;
		const fetchData = async function () {
			const converted = convertFilter(state.filter);

			const newData = await api.find({
				limit: state.limit,
				sort: state.sort,
				skip: state.skip,
				filter: converted
			});

			const count = await api.count({
				filter: converted
			});

			if (isMounted) {
				setState({
					...state,
					data: newData,
					count: count,
					loading: false
				});
			}

		}

		setTimeout(function () {
			fetchData();
		}, ARTIFICIAL_DELAY);

		setState({
			...state,
			loading: true
		});

		return () => {
			isMounted = false;
		}
	}, [state.limit, state.sort, state.skip, state.filter]);

	// transpose our display knobs into the displayOptions
	const knobOptions = [
		displayList ? "list" : undefined,
		displayGrid ? "grid" : undefined
	].filter(val => val);
	const displayOptions = knobOptions.length > 0 ? knobOptions : undefined;
	const display =
		displayOptions === undefined ? undefined :
		displayOptions.length === 1 ? displayOptions[0] :
		state.display
		;

	const gridConfig: DataViewProps = {
		title: "Your Uploads",
		columns: (display === "list" || display === undefined) ? listColumns : gridColumns,
		gridColumnsMap,
		primaryActions: primaryActions ? [
			{
				name: "edit",
				color: "blue",
				variant: "icon",
				mIcon: CreateIcon,
				onClick: function ({ data }) {
					alert(`EDIT ${data.id}`);
				}
			}
		] : undefined,
		additionalActions: additionalActions ? [
			{
				name: "view_children",
				label: "View Children",
				onClick: function ({ data }) {
					alert(`View Children ${data.id}`);
				}
			},
			{
				name: "history",
				label: "History",
				onClick: function ({ data }) {
					alert(`History ${data.id}`);
				}
			}
		] : undefined,
		bulkActions: bulkActions ? [
			{
				name: "download",
				color: "blue",
				variant: "icon",
				mIcon: CloudDownloadIcon,
				onClick: function ({ data }) {
					alert(`DOWNLOAD ${data.map(val => val.id)}`);
				}
			},
			{
				name: "delete",
				color: "blue",
				variant: "icon",
				mIcon: DeleteIcon,
				onClick: function ({ data }) {
					alert(`DELETE ${data.map(val => val.id)}`);
				},
				onAllClick: bulkAllActions ? function () {
					alert("DELETE ALL");
				} : undefined
			}
		] : [],
		buttons: [
			{
				name: "create",
				label: "Create New",
				mIcon: AddIcon,
				color: "blue",
				variant: "outlined",
				onClick: function () {
					alert("CREATE NEW");
				}
			}
		],
		filters: validFilters.map((filter): DataViewFilterDef => {
			return {
				name: filter.name,
				label: filter.label,
				component: filter.component,
				type: filter.type,
				args: {...filter.args, comparisonDefault},
				onChange: function (value) {
					filterChange(filter.name, value);
				}
			}
		}),
		displayOptions,
		sticky,
		onColumnsChange: function (data) {
			setState({
				...state,
				activeColumns: data
			});
		},
		onSkipChange: useCallback(function ({ skip }) {
			setState({
				...stateRef.current,
				skip
			});
		}, [stateRef]),
		onLimitChange: useCallback(function ({ limit }) {
			setState({
				...stateRef.current,
				limit,
				skip: 0
			});
		}, [stateRef]),
		onSortChange: useCallback(function (data) {
			setState({
				...stateRef.current,
				sort: data,
				skip: 0
			});
		}, [stateRef]),
		onDisplayChange: function (data) {
			setState({
				...state,
				display: data
			});
		},
		onSavedViewSave: function (data: DataViewProps["savedView"]) {
			viewsApi.upsert(data);
			gridConfig.onSavedViewChange(data);
		},
		onSavedViewGetOptions: function () {
			return [defaultView, ...viewsApi.find()];
		},
		onSavedViewChange: function (data: DataViewProps["savedView"]) {
			setState({
				...state,
				...data.state,
				savedView: data,
				skip: 0
			});
		},
		onSavedViewRemove: function (data) {
			if (data.id === state.savedView.id) {
				gridConfig.onSavedViewChange(defaultView);
			}

			viewsApi.remove(data);
		},
		onActiveFiltersChange: function ({ activeFilters, filter }) {
			setState({
				...state,
				activeFilters,
				filter
			});
		},
		savedViewAllowSharedViewSave,
		data: state.data,
		limit: state.limit,
		sort: state.sort,
		filter: state.filter,
		activeFilters: state.activeFilters
	};

	return (
		<StyledDiv>
			<MosaicContext.Provider value={mosaicSettings}>
				<DataView
					{...gridConfig}
					skip={state.skip}
					count={state.count}
					display={display}
					loading={state.loading}
					savedView={state.savedView}
					activeColumns={state.activeColumns}
				></DataView>
			</MosaicContext.Provider>
		</StyledDiv>
	);
}

export default DataViewKitchenSink;
