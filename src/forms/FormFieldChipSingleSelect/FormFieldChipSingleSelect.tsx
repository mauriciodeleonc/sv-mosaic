// React
import * as React from "react";
import { ReactElement, useEffect, useState, memo } from "react";

// Components
import Chip from "../../components/Chip";

//Types and styles
import { MosaicFieldProps } from "@root/components/Field";
import { FormFieldChipSingleSelectDef } from "./FormFieldChipSingleSelectTypes";
import { StyledChipGroup } from "./FormFieldChipSingleSelect.styled";
import { MosaicLabelValue } from "@root/types";

const FormFieldChipSingleSelect = (props: MosaicFieldProps<FormFieldChipSingleSelectDef, MosaicLabelValue>): ReactElement => {
	const {
		fieldDef,
		error,
		onChange,
		onBlur,
		value,
	} = props;

	const { required } = fieldDef || null;

	const [internalOptions, setInternalOptions] = useState([]);
	const [prepopulated, setPrepouplated] = useState(false);
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
			setPrepouplated(false);
		}
		populateOptions();
	}, [fieldDef?.inputSettings?.options, fieldDef?.inputSettings?.getOptions])

	useEffect(() => {
		if (value && !prepopulated) {

			if (origin === true) {
				findSelectedOption(value);
			}
			if (origin === false) {
				if (!internalOptions.find((o) => o.value === value.value)) {
					setInternalOptions([...internalOptions, {...value, selected: true}])
				} else {
					findSelectedOption(value);
				}
			}
			setPrepouplated(true);
		}
	}, [value, prepopulated, internalOptions, origin]);

	const findSelectedOption = (option) => {
		let newOptions = [...internalOptions];

		newOptions = newOptions.map((o) => (
			o?.value === option?.value ?
				{ ...o, selected: required && o.selected ? o.selected : !o.selected }
				:
				{ ...o, selected: false }
		)
		);

		const selectedOption = newOptions.find(o => o.selected === true);

		setInternalOptions(newOptions);

		return selectedOption;
	}

	const updateSelectedOption = (option) => {
		const selectedOption = findSelectedOption(option);
		setPrepouplated(true);
		onChange(selectedOption ?
			{label: selectedOption.label, value: selectedOption.value}
			: undefined);
	}

	const errorWithMessage = error?.trim().length > 0;

	return (
		<StyledChipGroup
			error={(errorWithMessage || (errorWithMessage && required))}
			onBlur={onBlur}
		>
			{
				internalOptions.map(
					(option) => <Chip
						key={option.value}
						label={option.label}
						disabled={fieldDef?.disabled}
						selected={option.selected}
						onClick={() => updateSelectedOption(option)}
					/>
				)
			}
		</StyledChipGroup>
	);
}

export default memo(FormFieldChipSingleSelect);
