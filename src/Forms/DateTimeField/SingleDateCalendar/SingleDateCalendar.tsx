import * as React from 'react';
import { ReactElement } from 'react';

// Styled Components
import { SingleDateCalendarProps } from './SingleDateCalendarTypes';
import Field from '@root/components/Field';
import DatePicker from '../DatePicker';
import { DateFormatSpan, DateTimePickerWrapper } from './SingleDateCalendar.styled';

const SingleDateCalendar = (props: SingleDateCalendarProps): ReactElement => {
	const {
		label,
		required,
		disabled,
		instructionText,
		error,
		errorText,
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
			<DateTimePickerWrapper>
				<DatePicker />
				<DateFormatSpan>Month, Day, Year</DateFormatSpan>
			</DateTimePickerWrapper>
		</Field>
	);
};

export default SingleDateCalendar;
