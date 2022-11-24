import * as React from "react";
import { useState, useMemo } from "react";
import styled from "styled-components";
import { /*List,*/ pick, xor } from "lodash";

import FilterListIcon from "@mui/icons-material/FilterList";
import DataViewFilterDropdown from "../DataViewFilterDropdown";
import { DataViewFilterMultiselectDropdownContent } from "@root/components/DataViewFilterMultiselect"
import Button from "../Button";
import theme from "@root/theme";
import { useMosaicTranslation } from "@root/i18n";
import { DataViewProps } from "./DataViewTypes";

const StyledDiv = styled.div`
	margin-bottom: -4px;

/* 	& > .filterRow {
		display: flex;
		align-items: center;
		flex-wrap: wrap;

		& .filter-value {
			max-width: 200px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	& > .filterRow > * {
		margin-right: 4px;
		margin-bottom: 4px;
	} */
`;

const FiltersRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 16px 24px;
`;

interface DataViewFiltersProps {
	activeFilters?: DataViewProps["activeFilters"];
	filters?: any;
	filter?: DataViewProps["filter"];
	onActiveFiltersChange?: DataViewProps["onActiveFiltersChange"];
	loading?: DataViewProps["loading"];
}
// interface DataViewFiltersProps {
// 	activeFilters?: {
// 		value?: any;
// 	};
// 	filters?: any;
// 	filter?: {
// 		[x: string]: {
// 			comparison?: any;
// 		} | {
// 			comparison?: undefined;
// 		};
// 	};
// 	onActiveFiltersChange?: any;
// }

function DataViewFilters(props: DataViewFiltersProps) {
	const { t } = useMosaicTranslation();

	const [state, setState] = useState({
		anchorEl : null,
		dropdownOpen : false
	});


	const activeFilters = props.activeFilters || [];
	/* 	const primaryFilters = props.filters.filter(val => val.type === "primary");
	const primaryFilterNames = primaryFilters.map(val => val.name); */
	//const optionalFilters = props.filters.filter(val => val.type !== "primary");

	const active = props.filters.filter(val => activeFilters.includes(val.name));
	const options = props.filters
		.map((val) => ({ label: val.label, value: val.name }))
		.sort((a, b) => a.label.localeCompare(b.label));

	const optionsSelected = useMemo(() => {
		return options.filter(option => activeFilters.includes(option.value))
	}, [options, activeFilters])

	const onRemove = (name: string) => () => {
		const activeFilters = xor(props.activeFilters, [name]);
		onActiveFiltersChange({ value: activeFilters });
	}

	const onClick = (event) => {
		setState({
			...state,
			anchorEl : event.currentTarget
		});
	}

	const onClose = () => {
		setState({
			...state,
			anchorEl : null
		});
	}

	const onEntered = () => {
		setState({
			...state,
			dropdownOpen : true
		});
	}

	const onExited = function() {
		setState({
			...state,
			dropdownOpen : false
		});
	}

	const onActiveFiltersChange = function(activeFiltersParam: { value: DataViewProps["activeFilters"], comparison?: string }) {
		//const filter = pick(props.filter, [...primaryFilterNames, ...activeFiltersParam.value]);
		const filter = pick(props.filter, [...activeFiltersParam.value]);

		// we only want to pass a new filter obj if we have actually removed a key from it, to prevent unnecessary re-fetches of data
		const setFilter = Object.keys(filter).join(",") !== Object.keys(props.filter).join(",");

		props.onActiveFiltersChange({
			activeFilters: activeFiltersParam.value,
			filter : setFilter === true ? filter : props.filter
		});

		onClose();
	};

	const getOptions = (filter) => {
		const regex = new RegExp(filter.keyword, "i");
		const results = options.filter((option) => option.label.match(regex));

		return {
			docs: results,
			hasMore: false
		}
	};

	return (
		<StyledDiv>
			<div className="filterRow">
				{/* 				{
					primaryFilters.map(filter => {
						const Component = filter.component;

						return (
							<Component
								key={filter.name}
								label={filter.label}
								type={filter.type}
								args={filter.args || {}}
								data={props.filter[filter.name] || {}}
								onRemove={onRemove(filter.name)}
								onChange={filter.onChange}
							/>
						)
					})
				} */}
				{
					props?.filters?.length > 0 &&
					<FiltersRow>
						<Button
							label={t("mosaic:DataView.filters")}
							variant="text"
							color="black"
							size="small"
							iconPosition="left"
							mIcon={FilterListIcon}
							mIconColor={theme.colors.gray600}
							onClick={onClick}
						/>
						<DataViewFilterDropdown
							anchorEl={state.anchorEl}
							onClose={onClose}
							onEntered={onEntered}
							onExited={onExited}
						>
							<DataViewFilterMultiselectDropdownContent
								comparison={""}
								selected={optionsSelected}
								getOptions={getOptions}
								isOpen={state.dropdownOpen}
								onApply={onActiveFiltersChange}
								onClose={onClose}
							/>
						</DataViewFilterDropdown>
						{
							active?.length > 0 &&
							<>
								{
									active.map(filter => {
										const Component = filter.component;
										return (
											<Component
												key={filter.name}
												label={filter.label}
												type={filter.type}
												args={filter.args || {}}
												data={props.filter[filter.name] || {}}
												onRemove={onRemove(filter.name)}
												onChange={filter.onChange}
											/>
										)
									})
								}
							</>
						}
						{
							active?.length > 0 &&
							<Button
								label={t("mosaic:DataView.clear_filters")}
								variant="text"
								color="teal"
								onClick={onClick}
							/>
						}
					</FiltersRow>
				}
			</div>
			{/* {
				active.length > 0 &&
				<div className="filterRow">
					{
						active.map(filter => {
							const Component = filter.component;
							return (
								<Component
									key={filter.name}
									label={filter.label}
									type={filter.type}
									args={filter.args || {}}
									data={props.filter[filter.name] || {}}
									onRemove={onRemove(filter.name)}
									onChange={filter.onChange}
								/>
							)
						})
					}
				</div>
			} */}
		</StyledDiv>
	)
}

export default DataViewFilters;
