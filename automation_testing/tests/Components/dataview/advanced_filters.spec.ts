import { test, expect, Page } from "@playwright/test";
import { DataviewPage } from "../../../pages/Components/DataView/DataviewPage";
import { advanced_filter_data, dataview_data, filter_data } from "../../../utils/data/dataview_data";
import { AdvancedFiltersComponent } from "../../../pages/Components/DataView/AdvancedFiltersComponent";
import { DatePickerComponent } from "../../../pages/Components/DataView/DatePickerComponent";
import { PaginationComponent } from "../../../pages/Components/DataView/PaginationComponent";
import { isACorrentDateRange } from "../../../utils/helpers/helper";
import { ColumnsComponent } from "../../../pages/Components/DataView/ColumnsComponent";
import theme from "../../../../src/theme";

test.describe.parallel("Components - Data View - Advanced Filters", () => {
	let page: Page;
	let _dataviewPage: DataviewPage;
	let advancedFilters: AdvancedFiltersComponent;
	let datepicker: DatePickerComponent;
	let pagination: PaginationComponent;
	let columns: ColumnsComponent;

	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
		_dataviewPage = new DataviewPage(page);
		advancedFilters = new AdvancedFiltersComponent(page);
		datepicker = advancedFilters.datepicker;
		pagination = _dataviewPage.paginationComponent;
		columns = _dataviewPage.columnsComponent;
		await _dataviewPage.visitPage();
	});

	test.afterEach(async() => {
		await page.reload();
	});

	test.afterAll(async ({ browser }) => {
		browser.close;
	});

	const validateFilterStyles = async () => {
		const expectedFontWeight = "700";
		const expectedFontSize = "14px";
		const expectedApplyButtonColor = "(0, 141, 168)";
		const expectedCleanAndCancelButtonColor = "(26, 26, 26)";

		const applyFontWeight = (await ((advancedFilters.page.locator("text=Apply")).evaluate(el => getComputedStyle(el).fontWeight)));
		const clearFontWeight = (await ((advancedFilters.page.locator("div[role='presentation'] >> text=Clear")).evaluate(el => getComputedStyle(el).fontWeight)));
		const cancelFontWeight = (await ((advancedFilters.page.locator("button:has-text('Cancel')")).evaluate(el => getComputedStyle(el).fontWeight)));
		const applyFontSize = (await ((advancedFilters.page.locator("text=Apply")).evaluate(el => getComputedStyle(el).fontSize)));
		const clearFontSize = (await ((advancedFilters.page.locator("div[role='presentation'] >> text=Clear")).evaluate(el => getComputedStyle(el).fontSize)));
		const cancelFontSize = (await ((advancedFilters.page.locator("button:has-text('Cancel')")).evaluate(el => getComputedStyle(el).fontSize)));
		const applyButtonColor = (await ((advancedFilters.page.locator("text=Apply")).evaluate(el => getComputedStyle(el).color))).split("rgb")[1];
		const clearButtonColor = (await ((advancedFilters.page.locator("div[role='presentation'] >> text=Clear")).evaluate(el => getComputedStyle(el).color))).split("rgb")[1];
		const cancelButtonColor = (await ((advancedFilters.page.locator("button:has-text('Cancel')")).evaluate(el => getComputedStyle(el).color))).split("rgb")[1];

		//Validate Font Weight
		expect(applyFontWeight).toBe(expectedFontWeight);
		expect(clearFontWeight).toBe(expectedFontWeight);
		expect(cancelFontWeight).toBe(expectedFontWeight);
		//Validate Font Size
		expect(applyFontSize).toBe(expectedFontSize);
		expect(clearFontSize).toBe(expectedFontSize);
		expect(cancelFontSize).toBe(expectedFontSize);
		//Validate Button Color
		expect(applyButtonColor).toBe(expectedApplyButtonColor);
		expect(clearButtonColor).toBe(expectedCleanAndCancelButtonColor);
		expect(cancelButtonColor).toBe(expectedCleanAndCancelButtonColor);
		await advancedFilters.page.keyboard.press("Escape");
	}

	test("Validate Single select category", async () => {
		await advancedFilters.selectFilter("singleSelectCategory");
		await advancedFilters.singleSelectCategoryBtn.click();
		const categorySelected = await advancedFilters.selectARandomCategoryForSingleSelectCategoryOption();
		expect((await advancedFilters._dataviewPage.getFilterText(advancedFilters.singleSelectCategoryBtn))).toBe(categorySelected);
		const allCategoriesOfRows = await _dataviewPage.getCategoriesFromRow();
		for (let i = 0; i < allCategoriesOfRows.length; i++) {
			expect(allCategoriesOfRows.toString()).toContain(categorySelected);
		}
	});

	test("Validate Single select category styles", async () => {
		await advancedFilters.selectFilter("singleSelectCategory");
		await advancedFilters.singleSelectCategoryBtn.click();
		await advancedFilters.validateFontColorFromElement(page.locator("span.menuLabel").nth(0), "#3B424E", true);
		await advancedFilters.validateFontColorFromElement(page.locator("span.menuLabel").nth(1), "#3B424E", true);
		expect(await advancedFilters.isFontBold(page.locator("span.menuLabel").nth(0))).toBe(true);
		await advancedFilters.page.keyboard.press("Escape");
	});

	test("Validate Categories with Comparisons - In", async () => {
		await advancedFilters.selectFilter("categoriesWithComparisons");
		await advancedFilters.categoryWithComparisonBtn.click();
		const selectedCategory = await advancedFilters.selectFirstCategoriesForCategoryWithComparisonOption();
		await advancedFilters.comparisonDropdown.click();
		await advancedFilters.comparisonInOption.click();
		await advancedFilters.applyBtn.click();
		const allCategoriesOfRows = await _dataviewPage.getCategoriesFromRow();
		for (let i = 0; i < allCategoriesOfRows.length; i++) {
			expect(allCategoriesOfRows.toString()).toContain(selectedCategory);
		}
	});

	test("Validate Categories with Comparisons - Not In", async () => {
		await advancedFilters.selectFilter("categoriesWithComparisons");
		await advancedFilters.categoryWithComparisonBtn.click();
		const selectedCategory = await advancedFilters.selectFirstCategoriesForCategoryWithComparisonOption();
		await advancedFilters.comparisonDropdown.click();
		await advancedFilters.comparisonNotInOption.click();
		await advancedFilters.applyBtn.click();
		const allCategoriesOfRows = await _dataviewPage.getCategoriesFromRow();
		for (let i = 0; i < allCategoriesOfRows.length; i++) {
			expect(allCategoriesOfRows.toString()).not.toContain(selectedCategory);
		}
	});

	test("Validate Categories with Comparisons - All", async () => {
		await advancedFilters.selectFilter("categoriesWithComparisons");
		await advancedFilters.categoryWithComparisonBtn.click();
		const selectedCategory = await advancedFilters.selectFirstCategoriesForCategoryWithComparisonOption();
		await advancedFilters.comparisonDropdown.click();
		await advancedFilters.comparisonAllOption.click();
		await advancedFilters.applyBtn.click();
		const allCategoriesOfRows = await _dataviewPage.getCategoriesFromRow();
		for (let i = 0; i < allCategoriesOfRows.length; i++) {
			expect(allCategoriesOfRows.toString()).toBe(selectedCategory);
		}
	});

	test("Validate Categories with Comparisons - Exists", async () => {
		await advancedFilters.selectFilter("categoriesWithComparisons");
		await advancedFilters.categoryWithComparisonBtn.click();
		await advancedFilters.comparisonDropdown.click();
		await advancedFilters.comparisonExistsOption.click();
		await advancedFilters.applyBtn.click();
		const allCategoriesOfRows = await _dataviewPage.getCategoriesFromRow();
		for (let i = 0; i < allCategoriesOfRows.length; i++) {
			expect(allCategoriesOfRows.toString()).not.toBe("");
		}
	});

	test("Validate Categories with Comparisons - Not Exists", async () => {
		await advancedFilters.selectFilter("categoriesWithComparisons");
		await advancedFilters.categoryWithComparisonBtn.click();
		await advancedFilters.comparisonDropdown.click();
		await advancedFilters.comparisonNotExistsOption.click();
		await advancedFilters.applyBtn.click();
		const allCategoriesOfRows = await _dataviewPage.getCategoriesFromRow();
		for (let i = 0; i < allCategoriesOfRows.length; i++) {
			expect(allCategoriesOfRows.toString()).toContain("");
		}
	});

	test("Validate Categories with Comparisons - Help Dialog", async () => {
		await advancedFilters.selectFilter("categoriesWithComparisons");
		await advancedFilters.categoryWithComparisonBtn.click();
		await advancedFilters.helpComparisonCategoriesDialogButton.click();
		const helpDialog = await advancedFilters.getHelpDialogFromCategoryWithComparisonOption();
		expect(helpDialog.toString()).toBe(advanced_filter_data.categoryComparisonHelpDialog);
		await page.reload();
	});

	test("Validate Categories with Comparisons - Keyword search", async () => {
		await advancedFilters.selectFilter("categoriesWithComparisons");
		await advancedFilters.categoryWithComparisonBtn.click();
		const selectedCategory = await advancedFilters.keywordSearchForComparisonCategory(filter_data.validKeywordFilter);
		await advancedFilters.comparisonDropdown.click();
		await advancedFilters.comparisonInOption.click();
		await advancedFilters.applyBtn.click();
		const allCategoriesOfRows = await _dataviewPage.getCategoriesFromRow();
		for (let i = 0; i < allCategoriesOfRows.length; i++) {
			expect(allCategoriesOfRows.toString()).toContain(selectedCategory);
		}
	});

	test("Validate selected category with comparisons style", async () => {
		const expectBgColor = theme.newColors.simplyGold["100"];
		await advancedFilters.selectFilter("categoriesWithComparisons");
		await advancedFilters.categoryWithComparisonBtn.click();
		await advancedFilters.selectFirstCategoriesForCategoryWithComparisonOption();
		expect(await advancedFilters.getBackgroundColorFromElement(_dataviewPage.selectedChips)).toBe(expectBgColor);
	});

	test("Validate Title with Comparisons - Contains Title", async () => {
		await advancedFilters.selectFilter("titleWithComparisons");
		await advancedFilters.titleWithComparisonBtn.click();
		await advancedFilters.searchForTitleComparison(advanced_filter_data.searchedTitleSimple);
		await advancedFilters.selectTitleComparisonOptionFromDropdown("Contains");
		await advancedFilters.applyBtn.click();
		const allTitlesOfRows = await _dataviewPage.getRowTitles();
		for (let i = 0; i < allTitlesOfRows.length; i++) {
			expect(allTitlesOfRows.toString()).toContain(advanced_filter_data.searchedTitleSimple.toLowerCase());
		}
	});

	test("Validate Title with Comparisons - Not Contains Title", async () => {
		await advancedFilters.selectFilter("titleWithComparisons");
		await advancedFilters.titleWithComparisonBtn.click();
		await advancedFilters.searchForTitleComparison(advanced_filter_data.searchedTitle);
		await advancedFilters.selectTitleComparisonOptionFromDropdown("Not Contains");
		await advancedFilters.applyBtn.click();
		const allTitlesOfRows = await _dataviewPage.getRowTitles();
		for (let i = 0; i < allTitlesOfRows.length; i++) {
			expect(allTitlesOfRows.toString()).not.toContain(advanced_filter_data.searchedTitle.toLowerCase());
		}
	});

	test("Validate Title with Comparisons - Equal Title", async () => {
		await advancedFilters.selectFilter("titleWithComparisons");
		await advancedFilters.titleWithComparisonBtn.click();
		await advancedFilters.searchForTitleComparison(advanced_filter_data.searchedTitle);
		await advancedFilters.selectTitleComparisonOptionFromDropdown("Equals");
		await advancedFilters.applyBtn.click();
		const allTitlesOfRows = await _dataviewPage.getRowTitles();
		for (let i = 0; i < allTitlesOfRows.length; i++) {
			expect(allTitlesOfRows.toString()).toContain(advanced_filter_data.searchedTitle.toLowerCase());
		}
	});

	test("Validate Title with Comparisons - Not Equal Title", async () => {
		await advancedFilters.selectFilter("titleWithComparisons");
		await advancedFilters.titleWithComparisonBtn.click();
		await advancedFilters.searchForTitleComparison(advanced_filter_data.searchedTitle);
		await advancedFilters.selectTitleComparisonOptionFromDropdown("Not Equal");
		await advancedFilters.applyBtn.click();
		const allTitlesOfRows = await _dataviewPage.getRowTitles();
		for (let i = 0; i < allTitlesOfRows.length; i++) {
			expect(allTitlesOfRows.toString()).not.toContain(advanced_filter_data.searchedTitle.toLowerCase());
		}
	});

	test("Validate Title with Comparisons - Exists Title", async () => {
		await advancedFilters.selectFilter("titleWithComparisons");
		await advancedFilters.titleWithComparisonBtn.click();
		await advancedFilters.selectTitleComparisonOptionFromDropdown("Exists");
		await advancedFilters.applyBtn.click();
		const allTitlesOfRows = await _dataviewPage.getRowTitles();
		for (let i = 0; i < allTitlesOfRows.length; i++) {
			expect(allTitlesOfRows.toString()).not.toBe("");
		}
	});

	test("Validate Title with Comparisons - Not Exists Title", async () => {
		await advancedFilters.selectFilter("titleWithComparisons");
		await advancedFilters.titleWithComparisonBtn.click();
		await advancedFilters.selectTitleComparisonOptionFromDropdown("Not Exists");
		await advancedFilters.applyBtn.click();
		expect(await _dataviewPage.noResults.textContent()).toBe(advanced_filter_data.noResults);
	});

	test("Validate created filter with valid dates", async () => {
		const startDate = advanced_filter_data.validStartDateRange;
		const endDate = advanced_filter_data.validEndDateRange;
		await advancedFilters.selectFilter("created");
		await advancedFilters.createdBtn.click();
		await advancedFilters.selectFilterDates(startDate, endDate);
		await advancedFilters.applyBtn.click();
		await advancedFilters.waitForElementLoad();

		expect(await pagination.paginationValue.textContent()).toBe(`1-${advanced_filter_data.createdFilterResults} of ${advanced_filter_data.createdFilterResults}`);
		const createdValues = await _dataviewPage.getAllRowData(dataview_data.resultPerPageDefault, "Created");
		const result = isACorrentDateRange(createdValues, startDate, endDate);
		expect(result.length).toBe(0);
	});

	test("Validate created filter with invalid range of dates", async () => {
		const startDate = advanced_filter_data.validStartDateRange;
		const endDate = advanced_filter_data.validEndDateRange;
		await advancedFilters.selectFilter("created");
		await advancedFilters.createdBtn.click();
		await advancedFilters.selectFilterDates(endDate, startDate);
		expect(await advancedFilters.applyBtn.isDisabled()).toBe(true);
		expect(await advancedFilters.errorMessageDates.textContent()).toContain(advanced_filter_data.errorMessageDates);
		await advancedFilters.cancelBtn.click();
	});

	test("Validate created filter no return results", async () => {
		await advancedFilters.selectFilter("created");
		await advancedFilters.createdBtn.click();
		const endDate = advanced_filter_data.validEndDateRange;
		await advancedFilters.waitForElementLoad();
		await advancedFilters.fromCalendarButton.click();
		await datepicker.selectDate(endDate);
		await advancedFilters.wait();
		await advancedFilters.applyBtn.click();
		await advancedFilters.waitForElementLoad();
		expect(await _dataviewPage.noResults.textContent()).toBe(advanced_filter_data.noResults);
	});

	test("Clear created filter", async () => {
		const startDate = advanced_filter_data.validStartDateRange;
		const endDate = advanced_filter_data.validEndDateRange;
		await advancedFilters.selectFilter("created");
		await advancedFilters.createdBtn.click();
		await advancedFilters.selectFilterDates(startDate, endDate);
		await advancedFilters.wait();
		await advancedFilters.clearBtn.click();

		expect(await advancedFilters.fromCalendarInput.inputValue()).toBe("");
		expect(await advancedFilters.toCalendarInput.inputValue()).toBe("");
		await advancedFilters.cancelBtn.click();
	});

	test("Remove created filter", async () => {
		const startDate = advanced_filter_data.validStartDateRange;
		const endDate = advanced_filter_data.validEndDateRange;
		await advancedFilters.selectFilter("created");
		await advancedFilters.createdBtn.click();
		await advancedFilters.selectFilterDates(startDate, endDate);
		await advancedFilters.applyBtn.click();
		await advancedFilters.wait();
		await advancedFilters.selectFilter("created");
		await advancedFilters.waitForElementLoad();
		expect(await pagination.paginationValue.textContent()).toBe(`1-${dataview_data.resultPerPageDefault} of ${dataview_data.totalRecords}`);
	});

	test("Validate updated filter with valid dates", async () => {
		const startDate = advanced_filter_data.validStartDateRange;
		const endDate = advanced_filter_data.validEndDateRange;
		await columns.selectColumn(advanced_filter_data.updatedOptionFilter);
		await advancedFilters.waitForElementLoad();
		await advancedFilters.selectFilter("updated");
		await advancedFilters.updatedBtn.click();
		await advancedFilters.selectFilterDates(startDate, endDate);
		await advancedFilters.applyBtn.click();
		await advancedFilters.waitForElementLoad();

		expect(await pagination.paginationValue.textContent()).toBe(`1-${advanced_filter_data.updateFilterResults} of ${advanced_filter_data.updateFilterResults}`);
		const updatedValues = await _dataviewPage.getAllRowData(dataview_data.resultPerPageDefault, "Updated");
		const result = isACorrentDateRange(updatedValues, startDate, endDate);
		expect(result.length).toBe(0);
	});

	test("Validate updated filter with invalid range of dates", async () => {
		const startDate = advanced_filter_data.validStartDateRange;
		const endDate = advanced_filter_data.validEndDateRange;
		await columns.selectColumn(advanced_filter_data.updatedOptionFilter);
		await advancedFilters.selectFilter("updated");
		await advancedFilters.updatedBtn.click();
		await advancedFilters.selectFilterDates(endDate, startDate);
		expect(await advancedFilters.applyBtn.isDisabled()).toBe(true);
		expect(await advancedFilters.errorMessageDates.textContent()).toContain(advanced_filter_data.errorMessageDates);
		await advancedFilters.cancelBtn.click();
	});

	test("Validate updated filter no return results", async () => {
		await columns.selectColumn(advanced_filter_data.updatedOptionFilter);
		await advancedFilters.selectFilter("updated");
		await advancedFilters.updatedBtn.click();
		const endDate = advanced_filter_data.validEndDateRange;
		await advancedFilters.waitForElementLoad();
		await advancedFilters.fromCalendarButton.click();
		await datepicker.selectDate(endDate);
		await advancedFilters.wait();
		await advancedFilters.applyBtn.click();
		await advancedFilters.waitForElementLoad();
		expect(await _dataviewPage.noResults.textContent()).toBe(advanced_filter_data.noResults);
	});

	test("Clear updated filter", async () => {
		const startDate = advanced_filter_data.validStartDateRange;
		const endDate = advanced_filter_data.validEndDateRange;
		await columns.selectColumn(advanced_filter_data.updatedOptionFilter);
		await advancedFilters.selectFilter("updated");
		await advancedFilters.updatedBtn.click();
		await advancedFilters.selectFilterDates(startDate, endDate);
		await advancedFilters.wait();
		await advancedFilters.clearBtn.click();
		expect(await advancedFilters.fromCalendarInput.inputValue()).toBe("");
		expect(await advancedFilters.toCalendarInput.inputValue()).toBe("");
		await advancedFilters.cancelBtn.click();
	});

	test("Remove updated filter", async () => {
		const startDate = advanced_filter_data.validStartDateRange;
		const endDate = advanced_filter_data.validEndDateRange;
		await columns.selectColumn(advanced_filter_data.updatedOptionFilter);

		await advancedFilters.selectFilter("updated");
		await advancedFilters.updatedBtn.click();
		await advancedFilters.selectFilterDates(startDate, endDate);
		await advancedFilters.applyBtn.click();
		await advancedFilters.wait();
		await advancedFilters.selectFilter("updated");
		await advancedFilters.waitForElementLoad();
		expect(await pagination.paginationValue.textContent()).toBe(`1-${dataview_data.resultPerPageDefault} of ${dataview_data.totalRecords}`);
	});

	test("Validate the Created filter styles.", async () => {
		await advancedFilters.selectFilter("created");
		await advancedFilters.createdBtn.click();
		await advancedFilters.waitForElementLoad();
		await validateFilterStyles();
	});

	test("Validate the Updated filter styles.", async () => {
		await advancedFilters.selectFilter("updated");
		await advancedFilters.updatedBtn.click();
		await advancedFilters.waitForElementLoad();
		await validateFilterStyles();
	});

	test("Validate error message has darkRed as color.", async () => {
		const expectColor = theme.newColors.darkRed["100"];
		const startDate = advanced_filter_data.validStartDateRange;
		const endDate = advanced_filter_data.validEndDateRange;
		await advancedFilters.selectFilter("created");
		await advancedFilters.createdBtn.click();
		await advancedFilters.selectFilterDates(endDate, startDate);
		expect(await advancedFilters.errorMessageDates.textContent()).toContain(advanced_filter_data.errorMessageDates);
		expect(await advancedFilters.getColorFromElement(advancedFilters.errorMessageDates)).toBe(expectColor);
		await advancedFilters.cancelBtn.click();
	});
});
