import { test, expect, Page } from "@playwright/test";
import { DataViewFilterDateComponent } from "../../../pages/Components/DataView/DataViewFilterDateComponent";
import { randomIntFromInterval } from "../../../utils/helpers/helper";
import { commonKnobs } from "../../../utils/data/knobs";

test.describe.parallel("Components - DataViewFilterDate - Playground", () => {
	let page: Page;
	let dvFilterDate: DataViewFilterDateComponent;

	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
		dvFilterDate = new DataViewFilterDateComponent(page);
	});

	test.afterAll(async ({ browser }) => {
		browser.close;
	});

	test("Validate Dataview Filter Date select pre filled values.", async () => {
		await dvFilterDate.visit(dvFilterDate.page_path, [commonKnobs.knobShowOptions + "true"]);
		await dvFilterDate.dateFilterButton.click();
		const randomPosition = randomIntFromInterval(1, await dvFilterDate.menuItem.count() - 1);
		const optionToSelect = await dvFilterDate.menuItem.nth(randomPosition).textContent();
		await dvFilterDate.menuItem.nth(randomPosition).click();
		expect(await dvFilterDate.dateFilterButton.textContent()).toContain(optionToSelect);
	});

	test("Validate that options are displayed.", async () => {
		await dvFilterDate.visit(dvFilterDate.page_path, [commonKnobs.knobShowOptions + "true"]);
		await dvFilterDate.dateFilterButton.click();
		await expect(dvFilterDate.dataviewFilterDateOptionsList).toBeVisible();
	});

	test("Validate that options are not displayed.", async () => {
		await dvFilterDate.visit(dvFilterDate.page_path, [commonKnobs.knobShowOptions + "false"]);
		await dvFilterDate.dateFilterButton.click();
		await expect(dvFilterDate.dataviewFilterDateOptionsList).not.toBeVisible();
	});
});
