import * as React from "react";
import { useMemo, ReactElement } from "react";
import {
	boolean,
	withKnobs,
	text,
	number,
	select,
} from "@storybook/addon-knobs";
import { FieldDef } from "@root/components/Field";
import Form, { useForm } from "@root/components/Form";
import { onCancel, renderButtons } from "@root/utils/storyUtils";

// Components
import AccountCircle from "@mui/icons-material/AccountCircle";

export default {
	title: "FormFields/FormFieldText",
	decorators: [withKnobs],
};

export const Playground = (): ReactElement => {
	const { state, dispatch	} = useForm();

	const size = select("Size", ["xs", "sm", "md", "lg"], "sm");
	const type = select("Type", ["password", "text"], "text");
	const placeholder = text("Placeholder", "placeholder");
	const maxCharacters = number("Max characters", 20);
	const disabled = boolean("Disabled", false);
	const required = boolean("Required", false);
	const multiline = boolean("Multiline", false);
	const minRows = number("Min rows for multiline", 3);
	const maxRows = number("Max rows for multiline", 4);
	const withIcon = boolean("With icon", false);
	const helperText = text("Helper text", "Helper text");
	const instructionText = text("Instruction text", "Instruction text");
	const label = text("Label", "Label");

	const fields: FieldDef[] = useMemo(
		(): FieldDef[] =>
			[
				{
					name: "textfield",
					label,
					type: "text",
					required,
					disabled,
					size,
					inputSettings: {
						prefixElement: withIcon && <AccountCircle />,
						maxCharacters,
						placeholder,
						multiline,
						type,
						minRows,
						maxRows
					},
					helperText,
					instructionText,
				},
			],
		[
			label,
			required,
			disabled,
			maxCharacters,
			size,
			placeholder,
			withIcon,
			multiline,
			helperText,
			instructionText,
			minRows,
			maxRows,
			type
		]
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
};

const kitchenSinkfields: FieldDef[] = [
	{
		name: "regular",
		label: "Regular example",
		type: "text",
		required: false,
		size: "md",
		inputSettings: {
			placeholder: "placeholder",
		},
		helperText: "Helper text",
		instructionText: "Instruction text"
	},
	{
		name: "password",
		label: "Password type example",
		type: "text",
		required: false,
		size: "md",
		inputSettings: {
			placeholder: "Password",
			type: "Password",
		},
		helperText: "Helper text",
		instructionText: "Instruction text"
	},
	{
		name: "multiline",
		label: "Multiline example",
		type: "text",
		required: false,
		size: "md",
		inputSettings: {
			multiline: true,
			placeholder: "placeholder",
		},
		helperText: "Helper text",
		instructionText: "Instruction text",
	},
	{
		name: "withMaxChar",
		label: "With a max chars stablished",
		type: "text",
		required: false,
		size: "md",
		inputSettings: {
			maxCharacters: 20,
			placeholder: "placeholder",
		},
		helperText: "Helper text",
		instructionText: "Instruction text",
	},
	{
		name: "withIcon",
		label: "With an icon",
		type: "text",
		required: false,
		size: "md",
		inputSettings: {
			prefixElement: <AccountCircle />,
			placeholder: "placeholder",
		},
		helperText: "Helper text",
		instructionText: "Instruction text",
	},
	{
		name: "disabled",
		label: "Disabled example shows the placeholder",
		type: "text",
		required: false,
		disabled: true,
		size: "md",
		inputSettings: {
			placeholder: "placeholder",
		},
		helperText: "Helper text",
		instructionText: "Instruction text",
	},
	{
		name: "xsSize",
		label: "Size xs",
		type: "text",
		required: false,
		size: "xs",
		helperText: "Helper text",
		instructionText: "Instruction text",
	},
	{
		name: "smSize",
		label: "Size sm",
		type: "text",
		required: false,
		size: "sm",
		helperText: "Helper text",
		instructionText: "Instruction text",
	},
	{
		name: "mdSize",
		label: "Size md",
		type: "text",
		required: false,
		size: "md",
		helperText: "Helper text",
		instructionText: "Instruction text",
	},
	{
		name: "lgSize",
		label: "Size lg",
		type: "text",
		required: false,
		size: "lg",
		helperText: "Helper text",
		instructionText: "Instruction text",
	},
];

export const KitchenSink = (): ReactElement => {
	const { state, dispatch } = useForm();

	return (
		<>
			<pre>{JSON.stringify(state, null, "  ")}</pre>
			<Form
				buttons={renderButtons(dispatch)}
				title='Form Title'
				description='Form description'
				state={state}
				fields={kitchenSinkfields}
				dispatch={dispatch}
				onCancel={onCancel}
			/>
		</>
	);
};
