import * as React from 'react';
import { memo, ReactElement, useEffect, useState, useMemo } from 'react';

// Components
import Button from '@root/forms/Button';

// Material UI
import { DialogActions, DialogContent, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

// Types and styles
import { ModalProps } from '.';
import {
	StyledDialog,
	StyledDialogDesktopTitle,
	StyledDialogMobileTitle,
} from './Modal.styled';
import FormLayout from '@root/forms/Form/FormLayout';
import { actions } from '../../forms/Form/formUtils';
import { StyledDisabledForm } from '@root/forms/Form/Form.styled';

const Modal = (props: ModalProps): ReactElement => {
	const {
		fields,
		open,
		title,
		onSubmit,
		onCancel,
		onLoad,
		submitButtonAttrs,
		cancelButtonAttrs,
		state,
		dispatch,
		sections,
	} = props;

	const [isMobileView, setIsMobileView] = useState(false);

	// useEffect(() => {
	// 	const loadForm = async () => {
	// 		await dispatch(
	// 			actions.prepopulateForm({ callback: onLoad })
	// 		);
	// 	}

	// 	if (onLoad)
	// 		loadForm();
	// }, [onLoad]);

	useEffect(() => {
		const setResponsiveness = () => {
			return window.innerWidth < 480
				? setIsMobileView(true)
				: setIsMobileView(false);
		};

		setResponsiveness();
		window.addEventListener('resize', setResponsiveness);

		return () => {
			window.removeEventListener('resize', setResponsiveness);
		};
	}, []);

	const submit = async (e) => {
		e.preventDefault();
		await dispatch(
			actions.submitForm()
		);
	}

	const cancel = (e) => {
		e.preventDefault();
		onCancel();
	}

	const PrimaryButton = useMemo(() => (
		<Button
			onClick={(e) => submit(e)}
			{...submitButtonAttrs}
		>
			{submitButtonAttrs?.children ? submitButtonAttrs?.children : 'Apply'}
		</Button>
	), [submitButtonAttrs?.children, onSubmit]);

	const displayMobile = useMemo(
		() => (
			<StyledDialogMobileTitle>
				<div>
					{onCancel && (
						<IconButton
							data-testid='arrow-back-icon'
							aria-label='close'
							disableRipple
							onClick={(e) => cancel(e)}
						>
							<ArrowBackIosIcon />
						</IconButton>
					)}
					<span>{title}</span>
				</div>
				{PrimaryButton}
			</StyledDialogMobileTitle>
		),
		[isMobileView, title, onCancel, submitButtonAttrs?.children, onSubmit]
	);

	const displayDesktop = useMemo(
		() => (
			<StyledDialogDesktopTitle>
				<span>{title}</span>
				{onCancel && (
					<IconButton
						data-testid='close-icon'
						aria-label='close'
						disableRipple
						onClick={(e) => cancel(e)}
					>
						<CloseIcon />
					</IconButton>
				)}
			</StyledDialogDesktopTitle>
		),
		[isMobileView, title, onCancel]
	);

	return (
		<StyledDialog fullScreen={isMobileView} open={open} onClose={(e) => cancel(e)}>
			{open &&
				<>
					<StyledDisabledForm disabled={state.disabled} />
					{isMobileView ? displayMobile : displayDesktop}
					<DialogContent>
						<FormLayout
							state={state}
							dispatch={dispatch}
							fields={fields}
							sections={sections}
						/>
					</DialogContent>
					{!isMobileView && (
						<DialogActions>
							<Button
								buttonType='secondary'
								onClick={(e) => cancel(e)}
								{...cancelButtonAttrs}
							>
								{cancelButtonAttrs?.children ? cancelButtonAttrs?.children : 'Cancel'}
							</Button>
							{PrimaryButton}
						</DialogActions>
					)}
				</>
			}
		</StyledDialog>
	);
};

export default memo(Modal);
