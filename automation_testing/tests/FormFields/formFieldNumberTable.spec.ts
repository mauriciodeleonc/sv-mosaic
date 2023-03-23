import { test, expect, Page } from "@playwright/test";
import theme from "../../../src/theme";
import { FormFieldNumberTablePage } from "../../pages/FormFields/FormFieldNumberTablePage";
import { commonKnobs, formFieldNumberTableKnobs as knob } from "../../utils/data/knobs";

test.describe.parallel("FormFields - FormFieldNumberTable - Playground", () => {
	let page: Page;
	let ffNumberTablePage: FormFieldNumberTablePage;

	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
		ffNumberTablePage = new FormFieldNumberTablePage(page);
		await ffNumberTablePage.visit(ffNumberTablePage.page_path);
	});

	test.afterAll(async ({ browser }) => {
		browser.close;
	});

	test("Validate the Disabled Knob.", async () => {
		await ffNumberTablePage.visit(ffNumberTablePage.page_path, [commonKnobs.knobDisabled + "true"]);
		const inputCount = await ffNumberTablePage.inputLocator.count();
		for (let i = 0; i < inputCount; i++) {
			await expect(ffNumberTablePage.inputLocator.nth(i)).toBeDisabled();
		}
		await page.reload();
	});

	test("Validate that the component compute a total for each row.", async () => {
		await ffNumberTablePage.validateTotalSumOfEachRow();
		await ffNumberTablePage.inputLocator.first().type("10");
		await ffNumberTablePage.inputLocator.last().type("10");
		await ffNumberTablePage.validateTotalSumOfEachRow();
	});

	test("Validate that the component compute a total for each column.", async () => {
		await ffNumberTablePage.validateTotalSumOfEachColumn();
		await ffNumberTablePage.inputLocator.first().type("10");
		await ffNumberTablePage.inputLocator.last().type("10");
		await ffNumberTablePage.validateTotalSumOfEachColumn();
	});

	test("Validate the style of the table header.", async () => {
		expect.soft(await ffNumberTablePage.getBackgroundColorFromElement(ffNumberTablePage.tableHeadRowLocator), "Validate Background color of table header.")
			.toBe(theme.newColors.grey2["100"]);
		for (let i = 0; i < await ffNumberTablePage.tableHeadRowLocator.first().locator("td").count(); i++) {
			const columnLocator = ffNumberTablePage.tableBodyRowLocator.first().locator("td").nth(i);
			expect.soft(await ffNumberTablePage.getFontWeightFromElement(columnLocator), "Validating Font Weight the Total of each column.")
				.toBe((theme.fontWeight.medium).toString());
			expect.soft(await ffNumberTablePage.getFontSizeFromElement(columnLocator), "Validating Font Size the Total of each column.").toBe("14px");
		}
	});

	test("Validate the style for the total row.", async () => {
		expect(await ffNumberTablePage.getBackgroundColorFromElement(ffNumberTablePage.tableBodyRowLocator.last())).toBe(theme.newColors.grey1["100"]);
		const totalColumnInRow = ffNumberTablePage.tableBodyRowLocator.last().locator("td").first();
		expect.soft(await ffNumberTablePage.getFontSizeFromElement(totalColumnInRow), "Validating Font Size the Total").toBe("14px");
		expect.soft(await ffNumberTablePage.getFontWeightFromElement(totalColumnInRow), "Validating Font Weight the Total").toBe((theme.fontWeight.semiBold).toString());

		for (let i = 1; i < await ffNumberTablePage.tableBodyRowLocator.last().locator("td").count() - 1; i++) {
			const columnLocator = ffNumberTablePage.tableBodyRowLocator.last().locator("td").nth(i);
			expect.soft(await ffNumberTablePage.getFontWeightFromElement(columnLocator), "Validating Font Weight the Total of each column.").toBe((theme.fontWeight.normal).toString());
			expect.soft(await ffNumberTablePage.getFontSizeFromElement(columnLocator), "Validating Font Size the Total of each column.").toBe("14px");
		}
	});

	test("Validate that the column and row sums are not displayed.", async () => {
		await ffNumberTablePage.visit(ffNumberTablePage.page_path, [knob.knobDisplayColumnsSum + "false", knob.knobDisplayRowSum + "false"]);
		expect(await ffNumberTablePage.numberTableLocator.locator("tr").last().locator("td").first().textContent()).not.toBe("TOTAL");
		expect(await ffNumberTablePage.numberTableLocator.locator("thead").locator("th").last().textContent()).not.toBe("No. Rooms");
	});
});
