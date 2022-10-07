import { test, expect, Page } from "@playwright/test";
import { FormFieldDropdownSingleSelectionPage } from "../../pages/FormFields/FormFieldDropdownSingleSelectionPage";

test.describe.parallel("FormFields - FormFieldDropdownSingleSelection - Kitchen Sink", () => {
	let page: Page;
	let formFieldDropdownSingleSelectionPage: FormFieldDropdownSingleSelectionPage;

	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
		formFieldDropdownSingleSelectionPage = new FormFieldDropdownSingleSelectionPage(page);
		await formFieldDropdownSingleSelectionPage.visitPage();
	});

	test.afterAll(async ({ browser }) => {
		browser.close;
	});

	test("Validate the regular dropdown", async () => {
		const option = "The Godfather";
		await formFieldDropdownSingleSelectionPage.selectOptionFromDropdown(formFieldDropdownSingleSelectionPage.regularDropdownInput, option);
		expect(await formFieldDropdownSingleSelectionPage.regularDropdownInput.inputValue()).toBe(option);
	});

	test("Validate the Disabled Field.", async () => {
		expect(await formFieldDropdownSingleSelectionPage.disabledField.textContent()).toBe("placeholder");
	});

	test("Validate xs dropdown size is valid", async () => {
		expect(await formFieldDropdownSingleSelectionPage.getElementWidth(formFieldDropdownSingleSelectionPage.xsSizeDropdownDiv)).toBe(100);
	});

	test("Validate sm  dropdown size is valid", async () => {
		expect(await formFieldDropdownSingleSelectionPage.getElementWidth(formFieldDropdownSingleSelectionPage.smSizeDropdownDiv)).toBe(280);
	});

	test("Validate md dropdown size is valid", async () => {
		expect(await formFieldDropdownSingleSelectionPage.getElementWidth(formFieldDropdownSingleSelectionPage.mdSizeDropdownDiv)).toBe(450);
	});

	test("Validate lg dropdown size is valid", async () => {
		expect(await formFieldDropdownSingleSelectionPage.getElementWidth(formFieldDropdownSingleSelectionPage.lgSizeDropdownDiv)).toBe(620);
	});

	test("Validate selecting a value in all the dropdown sizes", async () => {
		const option = "The Godfather";
		await formFieldDropdownSingleSelectionPage.selectOptionFromDropdown(formFieldDropdownSingleSelectionPage.xsSizeDropdownOpenButton, option);
		await formFieldDropdownSingleSelectionPage.selectOptionFromDropdown(formFieldDropdownSingleSelectionPage.smSizeDropdownOpenButton, option);
		await formFieldDropdownSingleSelectionPage.selectOptionFromDropdown(formFieldDropdownSingleSelectionPage.mdSizeDropdownOpenButton, option);
		await formFieldDropdownSingleSelectionPage.selectOptionFromDropdown(formFieldDropdownSingleSelectionPage.lgSizeDropdownOpenButton, option);
		expect(await formFieldDropdownSingleSelectionPage.xsSizeDropdownInput.inputValue()).toBe(option);
		expect(await formFieldDropdownSingleSelectionPage.smSizeDropdownInput.inputValue()).toBe(option);
		expect(await formFieldDropdownSingleSelectionPage.mdSizeDropdownInput.inputValue()).toBe(option);
		expect(await formFieldDropdownSingleSelectionPage.lgSizeDropdownInput.inputValue()).toBe(option);
	});
});
