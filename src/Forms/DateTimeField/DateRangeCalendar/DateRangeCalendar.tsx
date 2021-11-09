import * as React from 'react';
import { ReactElement } from 'react';

// Styled Components
import { DateRangeCalendarProps } from './DateRangeCalendarTypes';
import Field from '@root/components/Field';
import DatePicker from '../DatePicker';
import {
	DateRangeCalendarWrapper,
	StyledSpan,
} from './DateRangeCalendar.styled';
import {
	DateFormatSpan,
	DateTimePickerWrapper,
} from '../SingleDateCalendar/SingleDateCalendar.styled';

const DateRangeCalendar = (props: DateRangeCalendarProps): ReactElement => {
	const {
		label,
		required,
		disabled,
		instructionText,
		error,
		errorText,
		fromValue,
		onChangeFrom,
		onChangeTo,
		toValue
	} = props;

	return (
		<Field
			label={label}
			required={required}
			disabled={disabled}
			error={error}
			errorText={errorText}
			instructionText={instructionText}
		>
			<DateRangeCalendarWrapper>
				<DateTimePickerWrapper>
					<DatePicker onChange={onChangeFrom} value={fromValue}/>
					<DateFormatSpan>Month, Day, Year</DateFormatSpan>
				</DateTimePickerWrapper>
				<StyledSpan>To</StyledSpan>
				<DateTimePickerWrapper>
					<DatePicker onChange={onChangeTo} value={toValue}/>
					<DateFormatSpan>Month, Day, Year</DateFormatSpan>
				</DateTimePickerWrapper>
			</DateRangeCalendarWrapper>
		</Field>
	);
};

export default DateRangeCalendar;
