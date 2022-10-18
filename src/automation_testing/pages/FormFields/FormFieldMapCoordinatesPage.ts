import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class FormFieldMapCoordinatesPage extends BasePage {

	readonly page_path = "formfields-formfieldmapcoordinates--kitchen-sink";

	readonly page: Page;
	readonly map: Locator;
	readonly mapWithoutAddressAndAutocoordinatesDisabledButton: Locator;
	readonly mapDisabledDefaultLocation: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.map = page.locator("[aria-label='Map']");
		this.mapWithoutAddressAndAutocoordinatesDisabledButton = page.locator("button", { hasText: "ADD COORDINATES" }).nth(0);
		this.mapDisabledDefaultLocation = page.locator("//*[@id='4']/div/div/div/div/div/div[2]/div[2]/div[2]");
	}

	async visitPage(): Promise<void> {
		await this.visit(this.page_path, this.title);
	}

	async getCoordinateFromMapCard(mapCard: Locator, _isLatitute = true): Promise<string> {
		let index: number;
		const mapCoordinates = (await mapCard.innerText()).split("\n");
		if (_isLatitute == true) {
			index = mapCoordinates.indexOf("Latitude");
		} else {
			index = mapCoordinates.indexOf("Longitude");
		}
		return mapCoordinates[index + 1];
	}
}
