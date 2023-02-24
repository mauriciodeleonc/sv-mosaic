import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../BasePage";
import { buttonKnobs as knob } from "../../../utils/data/knobs";

export class ButtonPage extends BasePage {

	readonly page_path = "components-button--playground";

	readonly page: Page;
	readonly button: Locator;
	readonly listIconLocator: Locator;
	readonly hrefLocator: Locator;

	constructor(page: Page) {
		super(page);
		this.page = page;
		this.button = page.locator("button");
		this.listIconLocator = page.locator("[data-testid='FormatListBulletedOutlinedIcon']");
		this.hrefLocator = page.locator("a");
	}

	async getKnobForVariant(variant: "icon" | "outlined" | "contained" | "text"): Promise<string> {
		return (knob.knobVariant + variant).toString();
	}

	async getKnobForColor(color: "black" | "blue" | "lightBlue" | "red" | "yellow" | "teal" | "gray" | "white"): Promise<string> {
		return (knob.knobColor + color).toString();
	}

	async getKnobForPopoverEvent(event: "onClick" | "onHover"): Promise<string> {
		return (knob.knobPopoverEvent + event).toString();
	}

	async getKnobForSize(size: "small" | "medium"): Promise<string> {
		return (knob.knobPopoverEvent + size).toString();
	}

	async getKnobForShow(show: "Undefined"|"True"|"False"|"Function that returns true"|"Function that returns false"|"Array of true values"|
	"Array with one falsy value"|"Array of functions that return true"|"Array of functions, one returns false"): Promise<string> {
		const showWithoutWhitespace = show.split(" ").join("%20");
		return (knob.knobShow + showWithoutWhitespace).toString();
	}

	async getKnobForTypeOfLabel(type: "String"|"JSX"): Promise<string> {
		return (knob.knobTypeOfLabel + type).toString();
	}

	async getKnobForIconColor(color: "black" | "blue" | "lightBlue" | "red" | "yellow" | "teal" | "gray" | "white"): Promise<string> {
		return (knob.knobmIconColor + color).toString();
	}
}
