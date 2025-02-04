import * as React from "react";
import { ReactElement, useMemo } from "react";
import { boolean, withKnobs, text } from "@storybook/addon-knobs";
import { PhoneSelectionDef } from "./FormFieldPhoneSelectionDropdownTypes";
import { FieldDef } from "@root/components/Field";
import Form, { useForm } from "@root/components/Form";
import { onCancel, renderButtons } from "@root/utils/storyUtils";

export default {
	title: "FormFields/FormFieldPhoneSelectionDropdown",
	decorators: [withKnobs],
};

export const Playground = () : ReactElement => {
	const { state, dispatch } = useForm();

	const disabled = boolean("Disabled", false);
	const required = boolean("Required", false);
	const autoFormat = boolean("Autoformat", true);
	const country = text("Country code (e.g., us, mx, etc.)", "");
	const placeholder = text("Placeholder", "Placeholder");
	const label = text("Label", "Label");
	const helperText = text("Helper text", "Helper text");
	const instructionText = text("Instruction text", "Instruction text")

	const fields = useMemo(
		() =>
			[
				{
					name: "phone",
					label,
					type: "phone",
					required,
					disabled,
					inputSettings: {
						autoFormat,
						country,
						placeholder,
					},
					helperText,
					instructionText
				},
			] as FieldDef<PhoneSelectionDef>[],
		[disabled, required, autoFormat, country, placeholder, label, helperText, instructionText]
	);

	return (
		<>
			<pre>{JSON.stringify(state, null, "  ")}</pre>
			<Form
				buttons={renderButtons(dispatch)}
				title={text("Title", "Form Title")}
				description={text("Description", "This is a description example")}
				state={state}
				fields={fields}
				dispatch={dispatch}
				onCancel={onCancel}
			/>
		</>
	);
}

export const KitchenSink = (): ReactElement => {
	const { state, dispatch } = useForm();

	const fields = useMemo(
		() =>
			[
				{
					name: "phone",
					label: "Regular example",
					type: "phone",
					required: false,
					disabled: false,
					helperText: "Helper text",
					instructionText: 'Default contry code is "us"',
				},
				{
					name: "countryCode",
					label: "With a country code provided",
					type: "phone",
					required: false,
					disabled: false,
					inputSettings: {
						country: "ar",
					},
					helperText: "Helper text",
					instructionText: 'The country code of "ar" was provided',
				},
				{
					name: "autoformatEnabled",
					label: "Autoformat enabled",
					type: "phone",
					required: false,
					disabled: false,
					inputSettings: {
						autoFormat: true,
						country: "us",
					},
					helperText: "Helper text",
					instructionText: "Type a phone number to see the format",
				},
				{
					name: "withPlaceholder",
					label: "With a custom placeholder",
					type: "phone",
					required: false,
					disabled: false,
					inputSettings: {
						country: "us",
						placeholder: "Enter phone number"
					},
					helperText: "Helper text",
					instructionText: "Remove the phone number prefix to see the placeholder",
				},
			] as FieldDef<PhoneSelectionDef>[],
		[]
	);

	return (
		<>
			<pre>{JSON.stringify(state, null, "  ")}</pre>
			<Form
				buttons={renderButtons(dispatch)}
				title='Form Title'
				description='Form description'
				state={state}
				fields={fields}
				dispatch={dispatch}
				onCancel={onCancel}
			/>
		</>
	);
};
