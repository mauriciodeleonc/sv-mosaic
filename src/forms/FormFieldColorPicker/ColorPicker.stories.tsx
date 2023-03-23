import * as React from "react";
import { ReactElement, useMemo } from "react";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { FieldDef } from "@root/components/Field";
import Form, { useForm } from "@root/components/Form";
import { renderButtons } from "@root/utils/storyUtils";

export default {
	title: "FormFields/FormFieldColorPicker",
	decorators: [withKnobs],
};

export const Playground = (): ReactElement => {
	const { state, dispatch } = useForm();

	const label = text("Label", "Label");
	const disabled = boolean("Disabled", false);
	const required = boolean("Required", false);

	const fields = useMemo(
		(): FieldDef[] =>
			[
				{
					name: "color",
					label,
					type: "color",
					required,
					disabled,
				},
			],
		[label, required, disabled]
	);

	return (
		<>
			<pre>{JSON.stringify(state, null, "  ")}</pre>
			<div style={{height: "100vh"}}>
				<Form
					buttons={renderButtons(dispatch)}
					title={text("Title", "Form Title")}
					description={text("Description", "This is a description example")}
					state={state}
					fields={fields}
					dispatch={dispatch}
				/>
			</div>
		</>
	);
};

export const KitchenSink = (): ReactElement => {
	const { state, dispatch } = useForm();

	const fields = useMemo(
		() =>
			[
				{
					name: "color",
					label: "Regular Example",
					type: "color",
					required: false,
					disabled: false,
				},
				{
					name: "colorDisabled",
					label: "Disabled Example",
					type: "color",
					required: false,
					disabled: true,
				},
			] as FieldDef[],
		[]
	);

	return (
		<>
			<pre>{JSON.stringify(state, null, "  ")}</pre>
			<div style={{height: "100vh"}}>
				<Form
					buttons={renderButtons(dispatch)}
					title='Form Title'
					description='This is a description example'
					state={state}
					fields={fields}
					dispatch={dispatch}
				/>
			</div>
		</>
	);
};
