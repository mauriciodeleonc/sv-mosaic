import Button from "@root/components/Button";
import { MosaicFieldProps } from "@root/components/Field";
import { Snackbar } from "@root/index";
import _ from "lodash";
import * as React from "react";
import { memo, SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import { DragAndDropContainer, DragAndDropSpan, FileInput } from "../shared/styledComponents";
import FileCard from "./FileCard";
import { StyledFileGrid } from "./FormFieldUpload.styled";
import { TransformedFile, UploadData, UploadFieldInputSettings } from "./FormFieldUploadTypes";

const FormFieldUpload = (props: MosaicFieldProps<"upload", UploadFieldInputSettings, UploadData[]>) => {
	const {
		fieldDef,
		value,
		onChange,
	} = props;

	const {
		limit,
		onFileAdd,
		onFileDelete,
	} = fieldDef.inputSettings;

	const [isOver, setIsOver] = useState(false);
	const [pendingFiles, setPendingFiles] = useState({});
	const [openSnackBar, setOpenSnackbar] = useState(false);
	const fileInputField = useRef(null);
	const prevValueRef = useRef([]);

	useEffect(() => {
		prevValueRef.current = value;
	}, [value]);


	/**
	 * Executed when a file that's being
	 * dragged is over the drop zone.
	 * @param e
	 */
	const dragOver = (e) => {
		e.preventDefault();
	};

	/**
	 * When a file that's being dragged enters into
	 * the drop zone the isOver state is changed
	 * to apply styles conditionally.
	 * @param e
	 */
	const dragEnter = (e) => {
		e.preventDefault();
		setIsOver(true);
	};

	/**
	 * When the drop zone is leaved the isOver state
	 * is changed to apply styles conditionally.
	 * @param e
	 */
	const dragLeave = (e) => {
		e.preventDefault();
		setIsOver(false);
	};

	/**
	 * When a file is dropped, the file state is set with the
	 * file dropped and the uploadImage callback is triggered.
	 * @param e
	 */
	const fileDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsOver(false);
		const droppedFiles = { target: { files: e.dataTransfer.files }};
		handleNewFileUpload(droppedFiles);
	};

	/**
	 *  Triggers a click on the input of type file
	 *  to prompt the file selection.
	 */
	const uploadFiles = () => {
		fileInputField.current.click();
	};

	const onChunkComplete = async ({uuid, percent}) => {
		setPendingFiles((prevState) => (
			{
				...prevState,
				[uuid]: {
					...prevState[uuid],
					percent: percent * 100
				}
			}
		));
	};


	const onUploadComplete = async ({uuid, data}) => {
		onChange(prevValueRef?.current ? [...prevValueRef.current, data] : [data]);

		setPendingFiles((prevState) => {
			const newPendingFiles = {...prevState};
			delete newPendingFiles[uuid];
			return newPendingFiles;
		});
	};

	const onError = async ({uuid, message}) => {
		setPendingFiles((prevState) => (
			{
				...prevState,
				[uuid]: {
					...prevState[uuid],
					error: message
				}
			}
		));
	};

	/**
	 * Executed when a new file is uploaded.
	 * @param e
	 */
	const handleNewFileUpload = async (e) => {
		const newFiles: File[] = Array.from(e.target.files);

		const pendingWithoutError = Object.values(pendingFiles).filter((pendingFile: {error: string}) => pendingFile.error === undefined).length;

		if (
			limit !== undefined
			&& limit >= 0
			&& (
				(value !== undefined ? value.length : 0) + newFiles.length + pendingWithoutError > limit
			)
		) {
			setOpenSnackbar(true);
			return;
		}

		let transformedFiles: {[key: string]: TransformedFile} = {};

		newFiles.forEach(file => {
			transformedFiles = {
				...transformedFiles,
				[_.uniqueId()]: {
					data: {
						name: file.name,
						size: file.size + " bytes",
					},
					percent: 0,
					error: undefined,
					rawData: file,
				}
			}
		});

		/**
		 * After transforming the files we need to do 2 things:
		 * 1. Push them into the pending files
		 * 2. Call onFileAdd with each one of them. The arguments
		 * it receives will also need to receive the uuid,
		 * that way we know to which file should we update
		 * the percentage and error message, and which file to
		 * remove from the pending when its upload is complete.
		 */
		setPendingFiles({...pendingFiles, ...transformedFiles});

		for (const [key, file] of Object.entries(transformedFiles) as [string, TransformedFile][]) {
			onFileAdd({
				file: file?.rawData,
				onChunkComplete: ({ percent }) => onChunkComplete({uuid: key, percent}),
				onUploadComplete: (data) => onUploadComplete({uuid: key, data}),
				onError: (message) => onError({uuid: key, message}),
			})
		}
	};

	const handleFileDelete = async ({id}) => {
		await onFileDelete({id});

		const newValues = [...value].filter(file => file.id !== id);
		await onChange(newValues);
	}

	const handleErrorDelete = async ({id}) => {
		setPendingFiles((prevState) => {
			const newPendingFiles = {...prevState};
			delete newPendingFiles[id];
			return newPendingFiles;
		});
	}

	const closeSnackbar = (_event?: SyntheticEvent, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenSnackbar(false);
	};

	const shouldDisableField = useMemo(() => {
		const numOfPendingFiles = Object.values(pendingFiles).filter((pendingFile: {error: string}) => pendingFile.error === undefined).length;

		return (
			fieldDef.disabled ||
			(
				limit !== undefined
				&& limit >= 0
				&& (value !== undefined ? value.length : 0) + numOfPendingFiles >= limit
			)
		)
	}, [fieldDef.disabled, limit, value, pendingFiles]);

	return (
		<>
			{!shouldDisableField ?
				<DragAndDropContainer
					isOver={isOver}
					onDragOver={dragOver}
					onDragEnter={dragEnter}
					onDragLeave={dragLeave}
					onDrop={fileDrop}
					width={"620px"}
					data-testid="drag-and-drop-container"
				>
					{isOver ? (
						<DragAndDropSpan isOver={isOver}>
						Release and Drop
						</DragAndDropSpan>
					) : (
						<>
							<DragAndDropSpan isOver={isOver}>
							Drag & Drop files here or
							</DragAndDropSpan>
							<Button
								color="gray"
								variant="outlined"
								disabled={shouldDisableField}
								label="UPLOAD FILES"
								onClick={uploadFiles}
								muiAttrs={{disableRipple: true}}
							/>
						</>
					)}
					<FileInput
						data-testid="input-file-test"
						ref={fileInputField}
						onChange={handleNewFileUpload}
						title=""
						type="file"
						value=""
						multiple={limit === undefined || limit > 1 ? true : false}
					/>
				</DragAndDropContainer>
				:
				<DragAndDropContainer width={"620px"}>
					<>
						<DragAndDropSpan>
							Drag & Drop files here or
						</DragAndDropSpan>
						<Button
							color="gray"
							variant="outlined"
							disabled={shouldDisableField}
							label="UPLOAD FILES"
							onClick={uploadFiles}
							muiAttrs={{disableRipple: true}}
						/>
					</>
				</DragAndDropContainer>
			}
			{/**
			 * We'll have 2 FileGrids, 1 for the successfully
			 * uploaded files, and 1 for the pending / errors.
			 */}
			{value?.length > 0 &&
				<StyledFileGrid>
					{value.map(file => (
						<FileCard
							key={file.id}
							id={file.id}
							name={file.name}
							size={file.size}
							url={file.url}
							onFileDelete={handleFileDelete}
						/>
					))}
				</StyledFileGrid>
			}
			{pendingFiles && Object.keys(pendingFiles).length > 0 &&
				<StyledFileGrid>
					{Object.entries(pendingFiles).map(([key, file]: [key: string, file: {data: UploadData, error: string, percent: number}]) => {
						return (
							<FileCard
								key={key}
								id={key}
								name={file.data?.name}
								size={file.data?.size}
								url={file.data?.url}
								error={file.error}
								percent={file.percent}
								onFileDelete={file.error && handleErrorDelete}
							/>
						)
					})}
				</StyledFileGrid>
			}
			<Snackbar
				autoHideDuration={6000}
				label={`Upload limited to only ${limit} files. If there are pending files please try again when all files have finished uploading.`}
				open={openSnackBar}
				onClose={closeSnackbar}
			/>
		</>
	);
}

export default memo(FormFieldUpload);
