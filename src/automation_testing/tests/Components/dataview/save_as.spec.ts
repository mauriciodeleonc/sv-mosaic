import { test, expect, Page } from "@playwright/test";
import { dataview_data, saveAs_data } from "../../../utils/data/dataview_data";
import { DataviewPage } from "../../../pages/Components/DataView/DataViewPage";
import { SaveAsComponent } from "../../../pages/Components/DataView/SaveAsComponent";
import { PaginationComponent } from "../../../pages/Components/DataView/PaginationComponent";

test.describe.parallel("Components - Data View - Save As", () => {
	let page: Page;
	let dataviewPage: DataviewPage;
	let saveAs: SaveAsComponent;
	let pagination: PaginationComponent;

	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
		dataviewPage = new DataviewPage(page);
		saveAs = dataviewPage.saveAsComponent;
		pagination = dataviewPage.paginationComponent;
		await dataviewPage.visitPage();
	});

	test.beforeEach(async() => {
		await saveAs.removeAllSavedViews();
	});

	test.afterAll(async ({ browser }) => {
		browser.close;
	});

	test("New View", async () => {
		await saveAs.saveAsBtn.click();
		await saveAs.selectSaveAsOption(1);
		await saveAs.saveLabel.type(saveAs_data.saveAsView);
		await saveAs.saveViewBtn.click();
		expect(await saveAs.viewBtn.textContent()).toContain(saveAs_data.saveAsView);
		await saveAs.viewBtn.click();
		expect(await (await saveAs.getViewTypeByLabel(saveAs_data.saveAsView)).textContent()).toContain(saveAs_data.viewNotSharedType);
	});

	test("New View Shared", async () => {
		await saveAs.fillNewView(saveAs_data.saveAsViewShared);
		await expect(saveAs.saveAsCheckbox).not.toBeChecked();
		await saveAs.saveAsCheckbox.check();
		await expect(saveAs.saveAsCheckbox).toBeChecked();
		await saveAs.saveViewBtn.click();
		expect(await saveAs.viewBtn.textContent()).toContain(saveAs_data.saveAsViewShared);
		await saveAs.viewBtn.click();
		expect(await (await saveAs.getViewTypeByLabel(saveAs_data.saveAsViewShared)).textContent()).toContain(saveAs_data.viewSharedType);
	});

	test("Default View", async () => {
		await saveAs.viewBtn.click();
		expect(await (await saveAs.getViewTypeByLabel(saveAs_data.defaultView)).textContent()).toContain(saveAs_data.defaultType);
	});

	test("Change View", async () => {
		await saveAs.createNewView(saveAs_data.saveAsView);
		await saveAs.viewBtn.click();
		const selectBtn = await saveAs.selectViewBtnByLabel(saveAs_data.defaultView);
		await saveAs.wait();
		await selectBtn.click();
		expect(await saveAs.viewBtn.textContent()).toContain(saveAs_data.defaultView);
	});

	test("Cancel", async () => {
		await saveAs.saveAsBtn.click();
		await saveAs.selectSaveAsOption(1);
		await saveAs.saveLabel.type(saveAs_data.saveAsView);
		await saveAs.saveAsCheckbox.check();
		await saveAs.cancelViewBtn.click();
		expect(await saveAs.viewBtn.textContent()).toContain(saveAs_data.defaultView);
		await saveAs.viewBtn.click();
		expect(await saveAs.isLabelPresent(saveAs_data.saveAsView)).toBe(false);
	});

	test("Edit a View", async () => {
		await page.reload();
		await saveAs.createNewView(saveAs_data.saveAsView);

		await saveAs.viewBtn.click();
		await saveAs.wait();
		const editBtn = await saveAs.editBtnByLabel(saveAs_data.saveAsView);
		expect(await (await saveAs.getViewTypeByLabel(saveAs_data.saveAsView)).textContent()).toContain(saveAs_data.viewNotSharedType);
		await editBtn.click();
		await saveAs.saveLabel.fill(saveAs_data.saveAsViewEdit);
		await expect(saveAs.editCheckbox).not.toBeChecked();
		await saveAs.editCheckbox.check();
		await saveAs.saveViewBtn.click();

		expect(await saveAs.viewBtn.textContent()).toContain(saveAs_data.saveAsViewEdit);

		await saveAs.closeViewBtn.first().click({ force: true });
		expect(await (await saveAs.getViewTypeByLabel(saveAs_data.saveAsViewEdit)).textContent()).toContain(saveAs_data.viewSharedType);
	});

	test("Remove a View", async () => {
		await saveAs.createNewView(saveAs_data.saveAsView);
		await saveAs.viewBtn.click();
		await (await saveAs.moreOptionsBtnByLabel(saveAs_data.saveAsView)).click();
		const removeOption = await saveAs.getRemoveOption();
		await removeOption.click();
		await saveAs.closeViewBtn.click({ force: true });
		await saveAs.viewBtn.click();
		expect(await saveAs.isLabelPresent(saveAs_data.saveAsView)).toBe(false);
	});

	test("Overwrite view", async () => {
		await page.reload();
		await pagination.selectViewType("Grid");
		await pagination.selectResultOption(50, false);
		await pagination.wait()
		await saveAs.createNewView(saveAs_data.saveAsOverwriteView);

		expect(await pagination.resultAmountGrid.textContent()).toBe(`${dataview_data.resultPerPage50}`);
		const recordRangePerPage = await pagination.calulateRecordRangePerPage(dataview_data.resultPerPage50, 1, false);
		expect(await pagination.paginationValueGrid.textContent()).toBe(recordRangePerPage);
		expect(await saveAs.viewBtn.textContent()).toContain(saveAs_data.saveAsOverwriteView);
		expect(await dataviewPage.getColumnHeadersCount()).not.toBe(saveAs_data.defaultColumnHeadersList);
		await pagination.selectResultOption(100, false);
		await pagination.wait();
		await saveAs.saveAsBtn.click();
		await saveAs.selectSaveAsOption(2);
		expect(await pagination.resultAmountGrid.textContent()).toBe(`${dataview_data.resultPerPage100}`);

		await saveAs.viewBtn.click();
		await (await saveAs.selectViewBtnByLabel(saveAs_data.defaultView)).click();
		expect(await pagination.resultAmount.textContent()).toBe(`${dataview_data.resultPerPageDefault}`);
		expect(await saveAs.viewBtn.textContent()).toContain(saveAs_data.defaultView);
		await pagination.wait();
		await saveAs.viewBtn.click();
		await (await saveAs.selectViewBtnByLabel(saveAs_data.saveAsOverwriteView)).click();
		expect(await pagination.resultAmountGrid.textContent()).toBe(`${dataview_data.resultPerPage100}`);
		expect(await saveAs.viewBtn.textContent()).toContain(saveAs_data.saveAsOverwriteView);
	});
});
