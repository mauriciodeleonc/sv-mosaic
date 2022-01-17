import * as React from 'react';
import { ReactElement } from 'react';

// Components
import DatePicker from '../DatePicker';
import HelperText from '@root/components/Field/HelperText';
import TimePicker from '../TimePicker';

// Styles Components
import { DateTimePickerWrapper } from '../SingleDateCalendar/SingleDateCalendar.styled';
import { DateTimeInputRow } from './DateTimeInput.styled';
import { DisabledDateTimeValue } from '../DatePicker/DatePicker.styled';
import { MosaicFieldProps } from '@root/components/Field';
import { DateTimeInputDef } from '.';

const DateTimeInput = (props: MosaicFieldProps<DateTimeInputDef>): ReactElement => {
	const {
		error,
		fieldDef,
		value,
		onChange,
	} = props;

	const handleOnChange = (position, date) => {
		let newDates = { ...value };
		if (position === 0) {
			newDates = {
				...newDates,
				dateValue: date
			}
		} else {
			newDates = {
				...newDates,
				timeValue: date
			}
		}

		onChange(newDates);
	}

	return (
		<DateTimeInputRow>
			{!fieldDef?.disabled ? (
				<>
					<DateTimePickerWrapper>
						<DatePicker
							error={error}
							onChange={(d) => handleOnChange(0, d)}
							fieldDef={{
								label: '',
								inputSettings: {
									placeholder: 'Start'
								},
								required: fieldDef?.required,
							}}
							value={value?.dateValue}
						/>
						<HelperText>Month, Day, Year</HelperText>
					</DateTimePickerWrapper>
					<DateTimePickerWrapper>
						<TimePicker
							error={error}
							onChange={(d) => handleOnChange(1, d)}
							fieldDef={{
								label: '',
								inputSettings: {
									placeholder: '00:00 AM/PM'
								}
							}}
							value={value?.timeValue}
						/>
						<HelperText>Hour, Minute, AM or PM</HelperText>
					</DateTimePickerWrapper>
				</>
			) : (
				<>
					<DisabledDateTimeValue>
						{value?.dateValue ? value?.dateValue.toLocaleDateString('en-US') : 'Start'}
					</DisabledDateTimeValue>
					<DisabledDateTimeValue>
						{value?.timeValue
							? value?.timeValue.toLocaleString('en-US', {
								hour: 'numeric',
								minute: 'numeric',
								hour12: true,
							})
							: '00:00 AM/PM'}
					</DisabledDateTimeValue>
				</>
			)}
		</DateTimeInputRow>
	);
};

export default DateTimeInput;
