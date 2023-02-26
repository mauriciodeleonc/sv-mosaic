import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormFieldUpload from "./FormFieldUpload";
import { defaultValues } from "./uploadUtils";
import { FieldDef } from "@root/components/Field";

const fieldDef: FieldDef = {
	name: "uploadTest",
	label: "UploadTest",
	type: "upload",
	inputSettings: {
		limit: undefined,
		onFileAdd: jest.fn(),
		onFileDelete: jest.fn(),
	}
}

const fieldDefWithLimit: FieldDef = {
	name: "uploadTest",
	label: "UploadTest",
	type: "upload",
	inputSettings: {
		limit: 2,
		onFileAdd: jest.fn(),
		onFileDelete: jest.fn(),
	}
}

/**
 * All other tests related to progress bar, deleting files, etc
 * belong to FileCard.test.tsx
 */

describe("FormFieldUpload", () => {
	it("should upload a file", () => {
		render(
			<FormFieldUpload
				fieldDef={fieldDef}
				onChange={jest.fn()}
			/>
		);

		const file = new File(["hello"], "hello.png", { type: "image/png" });

		const dragAndDropContainer = screen.getByTestId("input-file-test") as HTMLInputElement;
		fireEvent.change(dragAndDropContainer, {
			target: { files: [file] },
		});

		expect(dragAndDropContainer.files[0]).toStrictEqual(file);
	});

	it("should render the default values", () => {
		render(
			<FormFieldUpload
				fieldDef={fieldDef}
				value={defaultValues.uploadField}
				onChange={jest.fn()}
			/>
		);

		const uploadedFiles = screen.getAllByTestId("file-card-container");
		expect(uploadedFiles.length).toBe(defaultValues.uploadField.length);
	});

	it("should limit the amount of files users can upload to max 2", () => {
		render(
			<FormFieldUpload
				fieldDef={fieldDefWithLimit}
				onChange={jest.fn()}
			/>
		);

		const files = [
			new File(["1"], "1.png", { type: "image/png" }),
			new File(["2"], "2.png", { type: "image/png" }),
			new File(["3"], "3.png", { type: "image/png" }),
			new File(["4"], "4.png", { type: "image/png" }),
		];

		const dragAndDropContainer = screen.getByTestId("input-file-test") as HTMLInputElement;
		fireEvent.change(dragAndDropContainer, {
			target: { files },
		});

		const snackbar = screen.getByText(`Upload limited to only ${fieldDefWithLimit.inputSettings.limit} files. If there are pending files please try again when all files have finished uploading.`);
		expect(snackbar).toBeInTheDocument();

	});
});
