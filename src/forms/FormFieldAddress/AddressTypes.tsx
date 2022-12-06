import { Dispatch, SetStateAction } from "react";
import { MosaicLabelValue } from "@root/types";

export type IAddress = {
	address1: string;
	address2?: string;
	address3?: string;
	city: string;
	country: MosaicLabelValue;
	id?: number;
	postalCode: string;
	state: MosaicLabelValue;
	types: MosaicLabelValue[];
};

export interface AddressCardProps {
	/**
	 * Address object that contains all the information
	 * to fill the address card.
	 */
	address: IAddress;
	/**
	 * Index of the current address card.
	 */
	addressIndex?: number;
	/**
	 * Disables edit and remove button
	 */
	disabled: boolean;
	/**
	 * Function executed when removing an address card.
	 */
	onRemoveAddress?: (address) => void;
	/**
	 * Function executed when editing an address card.
	 */
	onEdit?: (address, addressIndex) => void;
}
export interface AddressDrawerProps {
	addressToEdit: IAddress;
	isEditing: boolean;
	addressIdx: number;
	open: boolean;
	onChange?: (event: unknown) => Promise<void>;
	handleClose: (save?: boolean) => Promise<void>;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
	value: IAddress[];
	addressTypes?: MosaicLabelValue[];
	hasUnsavedChanges?: boolean;
	handleUnsavedChanges?: (val: boolean) => void;
	dialogOpen?: boolean;
	handleDialogClose?: (val: boolean) => void;
	getOptionsCountries: AddressFieldDef["getOptionsCountries"];
	getOptionsStates: AddressFieldDef["getOptionsStates"];
}

export type AddressFieldDef = {
	amountPerType?: number;
	amountShipping?: number;
	amountBilling?: number;
	amountPhysical?: number;
	getOptionsCountries(): Promise<MosaicLabelValue[]>;
	getOptionsStates(country: string): Promise<MosaicLabelValue[]>;
}
