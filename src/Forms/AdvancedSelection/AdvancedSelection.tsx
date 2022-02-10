import * as React from 'react';
import {
	memo,
	ReactElement,
	useState
} from 'react';

// Types
import { AdvancedSelectionDef } from './AdvancedSelectionTypes';
import { MosaicFieldProps } from '@root/components/Field';

// Components
import AddIcon from '@material-ui/icons/Add';
import Button from '@root/forms/Button';
import AdvancedSelectionModal from './AdvancedSelectionModal';

// Styles
import {
	AdvancedSelectionWrapper,
	StyledField,
} from './AdvancedSelection.styled';

// const MAX_CHIPS_TO_SHOW = 8;

const AdvancedSelection = (props: MosaicFieldProps<AdvancedSelectionDef>): ReactElement => {
	const {
		fieldDef,
		error,
		onChange,
		value,
	} = props;

	// const modalReducer = useForm();

	// State variables
	const [isModalOpen, setIsModalOpen] = useState(false);
	// const [showMore, setShowMore] = useState(false);
	// const [isMobileView, setIsMobileView] = useState(false);

	//TESTING
	// const [options, setOptions] = useState<optionsWithCategory[]>([]);
	// const [currentPage, setCurrentPage] = useState<number>(0);
	// const [filteredOptions, setFilteredOptions] = useState<optionsWithCategory[]>([]);
	// const [filteredPage, setFilteredPage] = useState<number>(0);
	// const [firstLoad, setFirstLoad] = useState<boolean>(false);
	// const [checkedFullInfo, setCheckedFullInfo] = useState<optionsWithCategory[]>([]);

	// useEffect(() => {
	// 	const setInternalOptions = async () => {
	// 		if (fieldDef?.inputSettings?.checkboxOptions && fieldDef?.inputSettings?.getOptions) {
	// 			let newOptions = fieldDef?.inputSettings?.checkboxOptions;

	// 			newOptions = newOptions.concat(await fieldDef?.inputSettings?.getOptions({
	// 				currentPage,
	// 				filter: null,
	// 				limit: fieldDef?.inputSettings?.getOptionsLimit ? fieldDef?.inputSettings?.getOptionsLimit : null,
	// 				groupByCategory: fieldDef?.inputSettings?.groupByCategory ? fieldDef?.inputSettings?.groupByCategory : undefined,
	// 			}));

	// 			setOptions(options.concat(newOptions));
	// 			setCurrentPage(currentPage + 1);
	// 			setFirstLoad(true);

	// 		} else if (fieldDef?.inputSettings?.checkboxOptions) {
	// 			setOptions(options.concat(fieldDef?.inputSettings?.checkboxOptions));
	// 			setFirstLoad(true);

	// 		} else if (fieldDef?.inputSettings?.getOptions) {
	// 			await getMoreOptions();

	// 			setFirstLoad(true);
	// 		}
	// 	}

	// 	if (isModalOpen && !firstLoad)
	// 		setInternalOptions();
	// }, [
	// 	isModalOpen,
	// 	fieldDef?.inputSettings?.checkboxOptions,
	// 	fieldDef?.inputSettings?.getOptions,
	// 	fieldDef?.inputSettings?.getOptionsLimit
	// ]);

	// useEffect(() => {
	// 	const setResponsiveness = () => {
	// 		setIsMobileView(window.innerWidth < BREAKPOINTS.mobile);
	// 	};

	// 	setResponsiveness();
	// 	window.addEventListener('resize', setResponsiveness);

	// 	return () => {
	// 		window.removeEventListener('resize', setResponsiveness);
	// 	};
	// }, []);

	// const debounce = (func, timeout = 300) => {
	// 	let timer;
	// 	return (...args) => {
	// 		clearTimeout(timer);
	// 		timer = setTimeout(() => { func.apply(this, args); }, timeout);
	// 	};
	// }

	// const a = debounce(() => getMoreOptions());

	// useEffect(() => {
	// 	if (modalReducer?.state?.data?.searchInput?.length > 0) {
	// 		setFilteredPage(0);
	// 		a();
	// 	}
	// }, [modalReducer?.state?.data?.searchInput]);

	// const filteredList = useMemo(() => {
	// 	if (modalReducer?.state?.data?.searchInput) {
	// 		const trimmedFilter = modalReducer?.state?.data?.searchInput?.trim().toLowerCase();
	// 		return filteredOptions.filter(
	// 			(option) => modalReducer?.state?.data?.searchInput === '' ||
	// 				option.label.toLowerCase().includes(trimmedFilter) ||
	// 				(fieldDef?.inputSettings?.groupByCategory &&
	// 					option.category?.toLowerCase().includes(trimmedFilter)
	// 				)

	// 		);
	// 	}
	// 	return options;
	// }, [
	// 	options,
	// 	filteredOptions,
	// 	modalReducer?.state?.data?.searchInput,
	// 	fieldDef?.inputSettings?.groupByCategory
	// ]);

	// 	/**
	//    * Fills a Map with the options ensuring that categories
	//    * are not repeated.
	//    */
	// 	const optionsWithCategories = useMemo(() => {
	// 		if (fieldDef?.inputSettings?.groupByCategory) {
	// 			const categories = new Map();
	// 			filteredList/*options*/.forEach((checkOption) => {
	// 				if (!categories.has(checkOption.category)) {
	// 					const categoryOptions = [checkOption];
	// 					categories.set(checkOption.category, categoryOptions);
	// 				} else {
	// 					const categoryOptions = categories.get(checkOption.category);
	// 					categoryOptions.push(checkOption);
	// 					categories.set(checkOption.category, categoryOptions);
	// 				}
	// 			});
	// 			return categories;
	// 		}
	// 	}, [fieldDef?.inputSettings?.groupByCategory, filteredList]);

	// 	/**
	//    * Used to toggle the state of showMore to
	//    * conditionally display 'X more' or 'Hide'.
	//    */
	// 	const handleShowMore = () => {
	// 		setShowMore(!showMore);
	// 	};

	/**
   * Sets the open state of the modal to true.
   */
	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	/**
   * Sets the open state of the modal to true.
   */
	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	/**
   * Modal is closed when the Save button is clicked.
   */
	// 	const handleSave = () => {
	// 		setIsModalOpen(false);

	// 		onChange(modalReducer?.state?.data['checkboxList']);
	// 	};

	// 	useMemo(() => {
	// 		modalReducer?.registerOnSubmit(handleSave);
	// 	}, [handleSave, modalReducer?.registerOnSubmit]);

	// 	/**
	//    * Closes the modal and checks, if there are no
	//    * saved options then, empties the optionsChecked array, otherwise
	//    * optionsChecked remains with the last savedOptions.
	//    */
	// 	const handleClose = () => {
	// 		setIsModalOpen(false);
	// 		modalReducer?.dispatch(
	// 			actions.setFieldValue({ name: 'searchInput', value: undefined })
	// 		);
	// 		if (value?.length === 0) {
	// 			modalReducer?.dispatch(
	// 				actions.setFieldValue({ name: 'checkboxList', value: undefined })
	// 			);
	// 			onChange([]);
	// 		}
	// 	};

	// 	/**
	//    * Called when the cross icon of a single chip is clicked.
	//    * @param optionValue is used to filter the chip from the
	//    * optionsChecked array.
	//    */
	// 	const onChipDelete = (optionValue) => {
	// 		const filteredChips = modalReducer?.state.data['checkboxList'].filter((option) => option !== optionValue)

	// 		modalReducer?.dispatch(
	// 			actions.setFieldValue({
	// 				name: 'checkboxList',
	// 				value: filteredChips,
	// 			})
	// 		);
	// 	};

	// 	useEffect(() => {
	// 		if (!isModalOpen) {
	// 			onChange(modalReducer?.state?.data['checkboxList']);
	// 		}
	// 	}, [isModalOpen, modalReducer?.state?.data['checkboxList']]);


	// /**
	//  * Maps over a list of options.
	//  * @param options to map over.
	//  * @returns an array of options objects
	//  * with a label/value structure.
	//  */
	// const mapListOfOptions = (optionsParam, list = checkedFullInfo) => {
	// 	if (!optionsParam) return;

	// 	return optionsParam.map((option) =>
	// 		list/*options*/.find((o) => o.value === option)
	// 	);
	// };

	// 	/**
	//    * JSX element with the list of selected options displayed
	//    * as chips.
	//    */
	// 	const chips = useMemo(() => {
	// 		let optionsChecked = [];
	// 		if (isModalOpen) {
	// 			optionsChecked = mapListOfOptions(modalReducer?.state?.data?.checkboxList);
	// 		}

	// 		if (value) {
	// 			optionsChecked = mapListOfOptions(value);
	// 		}

	// 		if (optionsChecked?.length > 0) {
	// 			return optionsChecked?.map((option, idx) => (
	// 				<Chip
	// 					disabled={fieldDef?.disabled}
	// 					key={`${option.label}-${idx}`}
	// 					label={option.label}
	// 					onDelete={() => onChipDelete(option.value)}
	// 				/>
	// 			));
	// 		}
	// 		return optionsChecked;
	// 	}, [isModalOpen, value, modalReducer.state.data.checkboxList, fieldDef?.disabled]);

	// const getMoreOptions = async () => {
	// 	if (fieldDef?.inputSettings?.getOptions) {
	// 		let newOptions = [];
	// 		newOptions = await fieldDef?.inputSettings?.getOptions({
	// 			currentPage: !modalReducer?.state?.data?.searchInput ? currentPage : filteredPage,
	// 			limit: fieldDef?.inputSettings?.getOptionsLimit ? fieldDef?.inputSettings?.getOptionsLimit : null,
	// 			filter: modalReducer?.state?.data?.searchInput ? modalReducer?.state?.data?.searchInput : undefined,
	// 			groupByCategory: fieldDef?.inputSettings?.groupByCategory ? fieldDef?.inputSettings?.groupByCategory : undefined,
	// 		});

	// 		if (!modalReducer?.state?.data?.searchInput) {
	// 			setOptions(options.concat(newOptions));
	// 			setCurrentPage(currentPage + 1);
	// 		} else {
	// 			if (newOptions.length > options.length)
	// 				setFilteredOptions(options.concat(newOptions));
	// 			else
	// 				setFilteredOptions(newOptions);
	// 		}
	// 	}
	// }

	// /**
	// * Renders a checkbox list for each category if groupByCategory is true
	// * otherwise just displays a single checkbox list with all the options
	// * @returns a list of CheckboxList or a single Checkboxlist
	// */
	// const showCheckboxList = (props): ReactElement[] | ReactElement => {
	// 	/**
	// 	 * Creates and array with the checked options
	// 	 * @param checked
	// 	 */
	// 	const onChangeCheckBoxList = async (checked) => {
	// 		if (modalReducer?.state?.data?.searchInput?.length > 0) {
	// 			setCheckedFullInfo(mapListOfOptions(checked, filteredList));
	// 		} else {
	// 			setCheckedFullInfo(mapListOfOptions(checked, options));
	// 		};

	// 		await modalReducer?.dispatch(
	// 			actions.setFieldValue({
	// 				name: 'checkboxList',
	// 				value: checked,
	// 			})
	// 		);
	// 	};

	// 	const updateOptionsList = () => {
	// 		if (modalReducer?.state?.data?.searchInput?.length > 0) {
	// 			getMoreOptions();
	// 			setFilteredPage(filteredPage + 1);
	// 		} else {
	// 			getMoreOptions();
	// 		}
	// 	}

	// 	if (fieldDef?.inputSettings?.groupByCategory && optionsWithCategories instanceof Map) {
	// 		return Array.from(optionsWithCategories).map(([category, value]) => (
	// 			<CheckboxListWrapper key={`${category}-${value}`}>
	// 				<OptionsCheckedModalWrapper key={`${category}-${value}`} isModalOpen={isModalOpen}>
	// 					{category && <CategoryTitle>{category}</CategoryTitle>}
	// 					<CheckboxList
	// 						options={value}
	// 						checked={props.value}
	// 						onChange={onChangeCheckBoxList}
	// 						disabled={fieldDef?.disabled}
	// 					/>
	// 				</OptionsCheckedModalWrapper>
	// 			</CheckboxListWrapper>
	// 		));
	// 	} else {
	// 		return (
	// 			<>
	// 				<CheckboxListWrapper>
	// 					<CheckboxList
	// 						options={filteredList/*options*/}
	// 						checked={props.value}
	// 						onChange={onChangeCheckBoxList}
	// 						disabled={fieldDef?.disabled}
	// 					/>
	// 				</CheckboxListWrapper>
	// 				<br />
	// 				<Button
	// 					buttonType='secondary'
	// 					disabled={fieldDef?.disabled}
	// 					onClick={updateOptionsList}
	// 				>
	// 					Load more
	// 				</Button>
	// 			</>
	// 		);
	// 	}
	// };

	// /**
	// * @returns the list of chips and the 'X more' or 'Hide' text
	// * if the selected options are greater than MAX_CHIPS_TO_SHOW
	// */
	// const showListOfChips = useCallback((): ReactElement => {
	// 	return modalReducer?.state?.data?.checkboxList?.length > 0 && (
	// 		<OptionsCheckedModalWrapper isModalOpen={isModalOpen}>
	// 			<ChipsWrapper isModalOpen={isModalOpen} isMobileView={isMobileView}>
	// 				{showMore ? chips : chips?.slice(0, MAX_CHIPS_TO_SHOW)}
	// 			</ChipsWrapper>
	// 			{modalReducer?.state?.data['checkboxList']?.length > MAX_CHIPS_TO_SHOW && (
	// 				<div onClick={handleShowMore}>
	// 					{showMore ? (
	// 						<ShowHideSpan>
	// 							{'Hide'} <StyledExpandLessIcon />
	// 						</ShowHideSpan>
	// 					) : (
	// 						<ShowHideSpan>
	// 							{`${modalReducer?.state?.data['checkboxList']?.length - MAX_CHIPS_TO_SHOW} more`}
	// 							<StyledExpandMoreIcon />
	// 						</ShowHideSpan>
	// 					)}
	// 				</div>
	// 			)}
	// 		</OptionsCheckedModalWrapper>
	// 	)
	// }, [
	// 	modalReducer?.state?.data?.checkboxList,
	// 	isModalOpen,
	// 	showMore,
	// 	chips,
	// 	fieldDef?.disabled
	// ]);

	// const searchInput = useCallback((props): ReactElement => {
	// 	/**
	// 	 * Handler for the input element
	// 	 * @param e input change event
	// 	 */
	// 	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 		modalReducer?.dispatch(
	// 			actions.setFieldValue({
	// 				name: 'searchInput',
	// 				value: e.target.value
	// 			})
	// 		);
	// 	};

	// 	/**
	// 	 * Adds an options to the list.
	// 	 */
	// 	const createOption = () => {
	// 		const newOption: optionsWithCategory = {
	// 			category: 'New Options',
	// 			value: `${props.value}_${options?.length}`,
	// 			label: props.value,
	// 		};

	// 		setOptions([...options, newOption]);

	// 		// fieldDef?.inputSettings?.updateOptionsCb ? fieldDef?.inputSettings?.updateOptionsCb(newOption) : undefined;
	// 	};

	// 	return (
	// 		<InputWrapper isMobileView={isMobileView}>
	// 			<StyledInput
	// 				type='text'
	// 				placeholder='Search...'
	// 				onChange={onInputChange}
	// 				value={props.value ? props.value : ''}
	// 				disabled={fieldDef?.disabled}
	// 			/>
	// 			{props.value /*&& fieldDef?.inputSettings?.updateOptionsCb*/ && (
	// 				<Button
	// 					buttonType='blueText'
	// 					disabled={fieldDef?.disabled}
	// 					icon={AddIcon}
	// 					onClick={createOption}
	// 				>
	// 					Create
	// 				</Button>
	// 			)}
	// 		</InputWrapper>
	// 	)
	// }, [fieldDef?.disabled, options]);

	// const fields = useMemo(
	// 	() => (
	// 		[
	// 			{
	// 				name: "listOfChips",
	// 				type: showListOfChips
	// 			},
	// 			{
	// 				name: "searchInput",
	// 				type: searchInput,
	// 			},
	// 			{
	// 				name: "checkboxList",
	// 				type: showCheckboxList,
	// 			},
	// 		] as FieldDef[]
	// 	), [
	// 	searchInput,
	// 	showCheckboxList,
	// 	showListOfChips,
	// 	fieldDef?.disabled
	// ]
	// );

	// useMemo(() => {
	// 	modalReducer?.registerFields(fields);
	// }, [fields, modalReducer?.registerFields]);

	return (
		<>
			{/* {modalReducer?.state?.data['checkboxList']?.length > 0 */ value && !isModalOpen ? (
				<StyledField
					label={fieldDef?.label}
					error={error}
					required={fieldDef?.required}
					disabled={fieldDef?.disabled}
					instructionText={fieldDef?.instructionText}
					helperText={fieldDef?.helperText}
					type='advancedSelection'
					className='advanced_selection'
				>
					<AdvancedSelectionWrapper>
						<Button
							buttonType='blueText'
							disabled={fieldDef?.disabled}
							icon={AddIcon}
							onClick={handleOpenModal}
							style={{ marginBottom: '8px' }}
						>
							Add Element
						</Button>
						{/* {showListOfChips()} */}
					</AdvancedSelectionWrapper>
				</StyledField>
			) : (
				<Button
					buttonType='secondary'
					disabled={fieldDef?.disabled}
					onClick={handleOpenModal}
				>
					ADD ELEMENT
				</Button>
			)}
			<AdvancedSelectionModal
				value={value}
				fieldDef={fieldDef}
				onChange={onChange}
				isModalOpen={isModalOpen}
				handleCloseModal={handleCloseModal}
			/>
			{/* <Modal
				title={fieldDef?.inputSettings?.modalTitle}
				state={modalReducer?.state}
				dispatch={modalReducer?.dispatch}
				fields={fields}
				open={isModalOpen}
				onCancel={handleClose}
				onSubmit={handleSave}
				submitButtonAttrs={{ children: 'Save' }}
				cancelButtonAttrs={{ children: 'Cancel' }}
			/> */}
		</>
	);
};

export default memo(AdvancedSelection);
