import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class FormFieldToggleSwitchPage extends BasePage {

	readonly page_path = "formfields-formfieldtoggleswitch--kitchen-sink";

	readonly page: Page;
	readonly regularToggleWithLabel: Locator;
	readonly regularLabel: Locator;
	readonly disabledToggle: Locator;
	readonly regularToggleWithoutLabel: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.regularToggleWithLabel = page.locator("input[type='checkbox']").nth(0);
		this.disabledToggle = page.locator("input[type='checkbox']").nth(1);
		this.regularToggleWithoutLabel = page.locator("input[type='checkbox']").nth(2);
		this.regularLabel = page.locator("span.MuiFormControlLabel-label").nth(0);
	}

	async visitPage(): Promise<void> {
		await this.visit(this.page_path, this.title);
	}
}
