import { MosaicObject } from "@root/types";
import { mapsValidators, required, Validator } from "./validators";

async function runValidators(
	validators: Validator[],
	value: unknown,
	data: unknown
): Promise<{
	errorMessage?: string | undefined;
	validator: Validator;
}> {
	for (const validator of validators) {
		const result = await validator.fn(value, data, validator.options);
		if (result) {
			return {
				errorMessage: result,
				validator,
			};
		}
	}

	return;
}

const isValidValue = (value: any) => {
	if (value === "" || value?.length === 0) {
		return false
	}

	return true;
}

export const formActions = {
	init({ fields }) {
		return async function (_dispatch, _getState, extraArgs): Promise<void> {
			extraArgs.fields = fields;
			const fieldMap = fields.reduce((prev, curr) => {
				prev[curr.name] = curr;
				return prev;
			}, {});
			extraArgs.fieldMap = fieldMap;
		};
	},
	setFieldValue({
		name,
		value,
		validate = false,
		touched = false,
	}: {
		name: string;
		value: unknown;
		validate?: boolean;
		touched?: boolean;
	}) {
		return async function(dispatch): Promise<void> {
			await dispatch({
				type: "FIELD_ON_CHANGE",
				name,
				value: isValidValue(value) ? value : undefined,
			});

			if (touched) {
				await dispatch({
					type: "FIELD_TOUCHED",
					name,
					value: touched,
				});
			}

			if (validate) {
				await dispatch(formActions.validateField({ name }));
			}
		};
	},
	validateField({ name }: { name: string }) {
		return async function (dispatch, getState, extraArgs): Promise<void> {
			const requiredFlag = extraArgs?.fieldMap[name]?.required;
			const validators = extraArgs?.fieldMap[name]?.validators ? extraArgs?.fieldMap[name]?.validators : [];

			if (validators.length === 0 && !requiredFlag) {
				return;
			}

			if (requiredFlag) {
				validators.unshift(required);
			}

			const validatorsMap = mapsValidators(validators);

			const data = getState().data;
			const startValue = getState().data[name];
			const result = await runValidators(validatorsMap, startValue, data);
			const currentValue = getState().data[name];

			if (startValue === currentValue) {
				await dispatch({
					type: "FIELD_VALIDATE",
					name,
					value: result?.errorMessage ?? undefined
				});
			}
		};
	},
	copyFieldToField({ from, to }: { from: any; to: string }) {
		return async function (dispatch, getState): Promise<void> {
			const fromValue = getState().data[from];
			await dispatch(
				formActions.setFieldValue({
					name: to,
					value: fromValue
				})
			);
		};
	},
	validateForm({ fields }) {
		return async function (dispatch, getState): Promise<boolean> {
			await dispatch({
				type: "FORM_START_DISABLE",
				value: true,
			});

			const touchedFields = getState().data;

			for (let i = 0; i < fields.length; i++) {
				const currFieldName = fields[i].name;
				(!!touchedFields[currFieldName] === false ||
					Array.isArray(touchedFields[currFieldName]) || typeof touchedFields[currFieldName] === "object") &&
					(await dispatch(
						formActions.validateField({ name: currFieldName })
					));
			}

			let validForm = true;
			let firstInvalidField: string | undefined = undefined;

			const errors = getState().errors;

			const entries = Object.entries(errors);

			for (const [key, value] of entries) {
				if (value !== undefined) {
					validForm = false;
					firstInvalidField = key;
					break;
				}
			}

			if (firstInvalidField !== undefined) {
				document.getElementById(firstInvalidField)?.scrollIntoView({ behavior: "smooth", block: "start" });
			}

			await dispatch({
				type: "FORM_VALIDATE",
				value: validForm,
			});

			await dispatch({
				type: "FORM_END_DISABLE",
				value: false,
			});

			return validForm;
		};
	},
	submitForm() {
		return async function (dispatch, getState, extraArgs): Promise<{ valid: boolean; data: any; }> {
			if (getState().disabled)
				return;

			const valid = await dispatch(
				formActions.validateForm({ fields: extraArgs.fields })
			);

			if (valid) {
				await dispatch({
					type: "PROPERTY_RESET",
					name: "touched",
					value: {},
				});
			}

			return {
				valid,
				data: getState().data
			}
		}
	},
	resetForm() {
		return async function (dispatch): Promise<void> {
			await dispatch({
				type: "FORM_RESET",
			});
		}
	},
	setFormValues({ values }: { values: MosaicObject }) {
		return async function (dispatch): Promise<void> {
			for (const [key, value] of Object.entries(values)) {
				await dispatch(
					formActions.setFieldValue({
						name: key,
						value: value,
						touched: false
					})
				);
			}
		}
	},
	disableForm({ disabled = false }: { disabled: boolean }) {
		return async function (dispatch): Promise<void> {
			await dispatch({
				type: disabled ? "FORM_START_DISABLE" : "FORM_END_DISABLE",
				value: disabled,
			});
		}
	}
};

export default formActions;
