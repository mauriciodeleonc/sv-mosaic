import * as React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Components
import Form, { useForm } from "@root/components/Form";
import { ReactElement } from "react";
import { FieldDef } from "@root/components/Field";
import { TextEditorDef } from "./FormFieldTextEditorTypes";
import { renderButtons } from "@root/utils/storyUtils";

afterEach(cleanup);

const TextEditorExample = (
	props: TextEditorDef & { disabled?: boolean }
): ReactElement => {
	const {
		direction = "ltr",
		maxCharacters = undefined,
		language = "en",
		spellcheck = false,
		disabled = false,
	} = props;

	const {
		state,
		dispatch,
	} = useForm();

	const fields = [
		{
			label: "Disabled test",
			name: "disabledTextEditor",
			type: "textEditor",
			disabled,
			inputSettings: {
				direction,
				maxCharacters,
				language,
				spellcheck,
			},
		},
	] as FieldDef[];

	return (
		<Form
			title="Title"
			description="Description"
			state={state}
			fields={fields}
			dispatch={dispatch}
			buttons={renderButtons(dispatch)}
		/>
	);
};

describe("TextEditor component", () => {
	it("should be disabled", async () => {
		render(<TextEditorExample disabled={true} />);
		const editorContent = await screen.findByTestId("text-editor-testid");

		expect(
			editorContent.firstElementChild.firstElementChild.children[1].firstElementChild
		).toHaveAttribute("aria-disabled", "true");
	});

	it("should have an ltr direction", async () => {
		render(<TextEditorExample direction={"ltr"} />);
		const editorContent = await screen.findByTestId("text-editor-testid");

		expect(
			editorContent.firstElementChild.firstElementChild.children[1].firstElementChild
		).toHaveAttribute("dir", "ltr");
	});

	it("should have an rtl direction", async () => {
		render(<TextEditorExample direction={"rtl"} />);
		const editorContent = await screen.findByTestId("text-editor-testid");

		expect(
			editorContent.firstElementChild.firstElementChild.children[1].firstElementChild
		).toHaveAttribute("dir", "rtl");
	});

	it("should render in german (de)", async () => {
		render(<TextEditorExample language={"de"} />);
		expect(await screen.findAllByLabelText("Fett")).toBeTruthy();
	});

	it("should spellcheck", async () => {
		render(<TextEditorExample spellcheck={true} />);
		const editorContent = await screen.findByTestId("text-editor-testid");

		expect(
			editorContent.firstElementChild.firstElementChild.children[1].firstElementChild
		).toHaveAttribute(
			"spellcheck",
			"true"
		);
	});
});
