import { test, expect, Page } from "@playwright/test";
import { DataViewFilterDateComponent } from "../../../pages/Components/DataView/DataViewFilterDateComponent";
import { randomIntFromInterval } from "../../../utils/helpers/helper";
import { commonKnobs } from "../../../utils/data/knobs";

test.describe.parallel("Components - DataViewFilterDate - Example", () => {
	let page: Page;
	let dataViewFilterDate: DataViewFilterDateComponent;

	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
		dataViewFilterDate = new DataViewFilterDateComponent(page);
	});

	test.afterAll(async ({ browser }) => {
		browser.close;
	});

	test("Validate Dataview Filter Date select pre filled values.", async () => {
		await dataViewFilterDate.visit(dataViewFilterDate.page_path, [commonKnobs.knobShowOptions + "true"]);
		await dataViewFilterDate.dateFilterButton.click();
		const randomPosition = randomIntFromInterval(1, await dataViewFilterDate.menuItem.count() - 1);
		const optionToSelect = await dataViewFilterDate.menuItem.nth(randomPosition).textContent();
		await dataViewFilterDate.menuItem.nth(randomPosition).click();
		expect(await dataViewFilterDate.dateFilterButton.textContent()).toContain(optionToSelect);
	});
});
