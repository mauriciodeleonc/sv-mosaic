/**
 * An array of strings denoting the type of the returned geocoded element.
 * For a list of possible strings, refer to the <a href=
 * "https://developers.google.com/maps/documentation/javascript/geocoding#GeocodingAddressTypes">
 * Address Component Types</a> section of the Developer&#39;s Guide.
*/
export const components = ["route", "locality", "postal_town", "postal_code", "administrative_area_level_1", "country"];
export const componentsS = ["address", "city", "country", "state", "country", "postalCode"];

export const initalAddressComponent = {
	label: "",
	value: ""
}


/**
 * Maps the address components object response of the autocomplete API to string values used
 * to display a message with  missing components on a snackback.
 */
export const componentsToAddress = {
	route: "address",
	locality: "city",
	country: "country",
	administrative_area_level_1: "state",
	postal_code: "postal code"
}
