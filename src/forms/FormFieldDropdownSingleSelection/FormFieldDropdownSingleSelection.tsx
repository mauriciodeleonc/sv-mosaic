import * as React from "react";
import { useState, memo, useEffect } from "react";
import {
	StyledAutocomplete,
	StyledDisabledDropdownText,
	StyledPopper,
	SingleDropdownWrapper,
} from "./FormFieldDropdownSingleSelection.styled";
import { MosaicFieldProps } from "@root/components/Field";
import { CustomPopperProps, DropdownSingleSelectionDef } from "./FormFieldDropdownSingleSelectionTypes";

// Components
import InputWrapper from "../../components/InputWrapper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import TextField from "@mui/material/TextField";
import { MosaicLabelValue } from "@root/types";

const DropdownSingleSelection = (props: MosaicFieldProps<DropdownSingleSelectionDef, MosaicLabelValue>) => {
	const {
		fieldDef,
		error,
		onChange,
		onBlur,
		value
	} = props;

	const [isOpen, setIsOpen] = useState(false);
	const [dropDownValue, setDropDownValue] = useState(null);

	const [internalOptions, setInternalOptions] = useState([]);
	// true: options
	// false: getOptions
	const [origin, setOrigin] = useState(undefined);

	useEffect(() => {
		const populateOptions = async () => {
			if (fieldDef?.inputSettings?.options) {
				setInternalOptions(fieldDef.inputSettings.options);
				setOrigin(true);
			} else if (fieldDef?.inputSettings?.getOptions) {
				const newOptions = await fieldDef.inputSettings.getOptions();
				setInternalOptions(newOptions);
				setOrigin(false);
			}
		}
		populateOptions();
	}, [fieldDef?.inputSettings?.options, fieldDef?.inputSettings?.getOptions])

	useEffect(() => {
		if (value && origin === false) {
			if (!internalOptions.find((o) => o?.value === value?.value))
				setInternalOptions([...internalOptions, value]);
		}
	}, [internalOptions, value, origin]);

	const renderInput = (params) => (
		<InputWrapper>
			<TextField
				{...params}
				data-testid="textfield-test-id"
				variant="outlined"
				placeholder={fieldDef?.inputSettings?.placeholder}
				required={fieldDef?.required}
			/>
		</InputWrapper>
	);

	const handleOpen = () => {
		setIsOpen(!isOpen)
	}

	const onDropDownChange = async (option: MosaicLabelValue) => {
		setDropDownValue(option)
		onChange && (await onChange(option ? option : undefined));
	}

	const isOptionEqualToValue = (option: MosaicLabelValue, value: MosaicLabelValue) => {
		if (value?.value === "") {
			return true;
		}

		return option.value === value?.value
	}

	const CustomPopper = (props: CustomPopperProps) => {
		return <StyledPopper value={value?.value === ""} {...props} />;
	};

	return (
		<>
			{!fieldDef?.disabled ?
				<SingleDropdownWrapper data-testid="dropdown-single-selection-test-id" innerWidth={fieldDef?.size}>
					<StyledAutocomplete
						value={value || null}
						onOpen={handleOpen}
						onClose={handleOpen}
						data-testid="autocomplete-test-id"
						options={internalOptions}
						getOptionLabel={(option) => option?.label ? option.label : ""}
						isOptionEqualToValue={isOptionEqualToValue}
						onChange={(_event, option) => onDropDownChange(option)}
						error={(fieldDef?.required && error) ? error : undefined}
						renderInput={renderInput}
						PopperComponent={CustomPopper}
						popupIcon={<ExpandMoreIcon />}
						onBlur={(e) => onBlur && onBlur(e.target.value)}
						open={isOpen}
					/>
				</SingleDropdownWrapper>
				:
				<StyledDisabledDropdownText
					data-testid="disabled-text-test-id"
				>
					{(!dropDownValue || dropDownValue?.label.trim() === "") ?
						fieldDef?.inputSettings?.placeholder : dropDownValue.label
					}
				</StyledDisabledDropdownText>
			}
		</>
	);
};

export default memo(DropdownSingleSelection);
