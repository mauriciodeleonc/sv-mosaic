export const validatorsData = {
	require: "Required",
	requireError: "This field is required, please fill it",
	validEmail: "test@mail.com",
	invalidEmail: "aaa",
	emailError: "The value is not a valid e-mail",
	validNumber: 123456,
	invalidNumber: "sabs",
	numberError: "The value is not a number",
	validUrl: "www.google.com",
	invalidUrl: "ase232",
	urlError: "The value is not a valid URL",
	invalidDate: "42/32/2201",
	dateError: "Start date should happen before the end date",
	saveValues: "{\n\"required\": \"Required\",\n\"email\": \"test@mail.com\",\n\"number\": \"123456\",\n\"url\": \"www.google.com\",\n\"startDate\": \"2021-09-15T00:00:00.000Z\",\n\"endDate\": \"2022-06-14T00:00:00.000Z\"\n}"
}

export const getFormAndDefaultValuesExpected = {
	simpleTextFormValues: "Text field from getFormValues",
	simpleTextDefaultValues: "Passing default value",
	dropdownSingleSelectFormValues: "The Dark Knight",
	dropdownSingleSelectDefaultValues: "The Shawshank Redemption",
	phoneSelectionFormValues: "+15205751152",
	phoneSelectionDefaultValues: "+15205751151",
	colorFormValues: "#a8001791",
	colorDefaultValues: "#19a80091",
	addressTypeFormValues: "Physical Address",
	addressTypeDefaultValues: "Physical, Billing, Shipping Address",
	advancedSelectionDefaultValues: ["Default Value 1", "Default Value 2", "Option 1", "Option 2", "Option 3", "Option 4", "Option 1 category 2", "Test option category 2"],
	latitudeMapCoordinates: "32.3395031",
	longitudeMapCoordinates: "-110.9864294",
	firstRowDataTable: ["John", "john@email.com", "01/01/2021", "3231-962-7516" ],
	secondRowDataTable: ["Mark", "mark@email.com", "01/01/2022", "3231-962-7518" ]
}
