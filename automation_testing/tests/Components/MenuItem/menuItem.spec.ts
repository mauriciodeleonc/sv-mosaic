import { test, expect, Page } from "@playwright/test";
import { MenuItemPage } from "../../../pages/Components/MenuItem/MenuItemPage";
import theme from "../../../../src/theme";

test.describe("Components - MenuItem - With Icon", () => {
	let page: Page;
	let menuItemPage: MenuItemPage;

	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
		menuItemPage = new MenuItemPage(page);
		await menuItemPage.visitPage();
	});

	test.afterAll(async ({ browser }) => {
		await browser.close();
	});

	test("Validate Icon has darkRed color.", async () => {
		const expectColor = theme.newColors.darkRed["100"];
		expect(await menuItemPage.getColorFromElement(menuItemPage.deleteIcon)).toBe(expectColor);
	});
});
