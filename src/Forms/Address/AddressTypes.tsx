export type IAddress = {
	address1: string;
	address2?: string;
	address3?: string;
	city: string;
	country: { title: string; value: any };
	countryName?: string;
	postalCode: string;
	state: { title: string; value: any };
	stateName?: string;
	types: string[];
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
	 * Function executed when removing an address card.
	 */
	onRemoveAddress?: (address) => void;
	/**
	 * Function executed when editing an address card.
	 */
	onEdit?: (address, addressIndex) => void;
}

export interface AddressProps {
	/**
	 * Meaningful name related to this component.
	 */
	label: string;
	value?: IAddress[];
	onChange?: (event: unknown) => void;
}
