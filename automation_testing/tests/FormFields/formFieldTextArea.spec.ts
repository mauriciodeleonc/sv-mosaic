import { test, expect, Page } from "@playwright/test";
import { FormFieldTextAreaPage } from "../../pages/FormFields/FormFieldTextAreaPage";

test.describe.parallel("FormFields - FormFieldsTextArea - Kitchen Sink", () => {
	let page: Page;
	let formFieldTextAreaPage: FormFieldTextAreaPage;

	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
		formFieldTextAreaPage = new FormFieldTextAreaPage(page);
		await formFieldTextAreaPage.visitPage();
	});

	test.beforeEach(async() => {
		await formFieldTextAreaPage.removeAllValuesFromTextAreas();
	});

	test.afterAll(async ({ browser }) => {
		browser.close;
	});

	test("Validate that the provided text is saved when submitted.", async () => {
		page.on("dialog", async dialog => {
			const message = dialog.message().split(/[{}]/)[1].split(/[\n":]/).map(el => el.trim()).filter(el => el !== "");
			expect(message[1]).toBe(sampleText);
			await dialog.dismiss();
		});
		const sampleText = "regular example text";
		await formFieldTextAreaPage.regularTextArea.type(sampleText);
		await formFieldTextAreaPage.saveBtn.click();
	});

	test("Validate max number the chars allowed", async () => {
		const maxAmoutChar = await formFieldTextAreaPage.getLimitOfMaxChar(formFieldTextAreaPage.maxCharCounter);
		expect(Number(await formFieldTextAreaPage.maxCharTextArea.getAttribute("maxlength"))).toBe(maxAmoutChar);

		const randomStringEqualToMax = await formFieldTextAreaPage.getAutogeneratedText(Number(maxAmoutChar));
		const randomStringGreaterThanMax = await formFieldTextAreaPage.getAutogeneratedText(Number(maxAmoutChar + 5));
		await formFieldTextAreaPage.maxCharTextArea.type(randomStringEqualToMax);
		expect((await formFieldTextAreaPage.maxCharTextArea.inputValue()).length).toBeLessThanOrEqual(maxAmoutChar);
		await formFieldTextAreaPage.maxCharTextArea.fill("");
		await formFieldTextAreaPage.maxCharTextArea.type(randomStringGreaterThanMax);
		expect((await formFieldTextAreaPage.maxCharTextArea.inputValue()).length).toBeLessThanOrEqual(maxAmoutChar);
	});

	test("Validate that the text field is disabled ", async () => {
		await expect(formFieldTextAreaPage.disabledTextArea).toBeDisabled();
	});

	test("Validate xs regular text size is valid", async () => {
		const width = Number((await ((formFieldTextAreaPage.xsSizeTextArea).evaluate(el => getComputedStyle(el).width))).split("px")[0]);
		expect(width).toBe(100);
	});

	test("Validate sm regular text size is valid", async () => {
		const width = Number((await ((formFieldTextAreaPage.smSizeTextArea).evaluate(el => getComputedStyle(el).width))).split("px")[0]);
		expect(width).toBe(280);
	});

	test("Validate md regular text size is valid", async () => {
		const width = Number((await ((formFieldTextAreaPage.mdSizeTextArea).evaluate(el => getComputedStyle(el).width))).split("px")[0]);
		expect(width).toBe(450);
	});

	test("Validate lg regular text size is valid", async () => {
		const width = Number((await ((formFieldTextAreaPage.lgSizeTextArea).evaluate(el => getComputedStyle(el).width))).split("px")[0]);
		expect(width).toBe(620);
	});

	test("Validate that the empty value is saved correctly.", async () => {
		const sampleText = "regular example text";
		await formFieldTextAreaPage.regularTextArea.type(sampleText);
		await formFieldTextAreaPage.saveBtn.click();
		await formFieldTextAreaPage.regularTextArea.selectText();
		await formFieldTextAreaPage.clearAllValuesFromField();
		await formFieldTextAreaPage.saveBtn.click();
		page.on("dialog", async dialog => {
			expect(dialog.message()).toContain("Form submitted with the following data: {}");
			await dialog.accept();
		});
	});
});
