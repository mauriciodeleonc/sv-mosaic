import { test, expect, Page } from "@playwright/test";
import { RadioButtonPage } from "../../../pages/Components/RadioButton/RadioButtonPage";
import theme from "../../../../src/theme";

test.describe.parallel("Components - RadioButton - Group", () => {
	let page: Page;
	let radioButtonPage: RadioButtonPage;

	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
		radioButtonPage = new RadioButtonPage(page);
		await radioButtonPage.visitPage();
	});

	test.afterAll(async ({ browser }) => {
		await browser.close();
	});

	test("Validate selected radio button has simplyGold color.", async () => {
		const expectColor = (theme.newColors.simplyGold["100"]);
		await radioButtonPage.radioButtonInput.first().check();
		expect(await radioButtonPage.getColorFromElement(radioButtonPage.radioButtonSpan.first())).toBe(expectColor);
	});

	test("Validate unselected radio button has almostBlack color.", async () => {
		const expectColor = theme.newColors.almostBlack["100"];
		if (await radioButtonPage.radioButtonSpan.first().isChecked()) {
			await radioButtonPage.radioButtonSpan.first().uncheck();
		}
		expect(await radioButtonPage.getColorFromElement(radioButtonPage.radioButtonSpan.first())).toBe(expectColor);
	});
});
