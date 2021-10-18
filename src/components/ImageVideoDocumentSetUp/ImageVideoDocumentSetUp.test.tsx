import * as React from 'react';
import { useState } from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';

// Components
import ImageVideoDocumentSetUp from './ImageVideoDocumentSetUp';

afterEach(cleanup);

const editCallback = jest.fn();
const translateCallback = jest.fn();
const browseCallback = jest.fn();

const ImageVideoDocumentSetUpExample = () => {
	const [assetProperties, setAssetProperties] = useState([]);

	const handleSetImage = () => {
		setAssetProperties([
			{
				label: 'Title',
				value: 'Test title',
			},
			{
				label: 'Type',
				value: 'Image',
			},
			{
				label: 'Alt',
				value: '-',
			},
			{
				label: 'Size',
				value: '1280x720',
			},
			{
				label: 'Focus',
				value: 'No',
			},
			{
				label: 'Locales',
				value: '-',
			},
		]);
	};

	const handleRemove = () => {
		setAssetProperties([]);
	};

	return (
		<ImageVideoDocumentSetUp
      assetProperties={assetProperties}
			handleBrowse={browseCallback}
			handleEdit={editCallback}
			handleTranslate={translateCallback}
			handleSetImage={handleSetImage}
			handleRemove={handleRemove}
			label='Label'
			src={
				'http://res.cloudinary.com/simpleview/image/upload/v1542821844/clients/grandrapids/_OD_0354_c78fbb66-c75a-4804-9430-9af38ed8e9d5.jpg'
			}
		/>
	);
};

describe('ImageVideoDocumentSetUp component', () => {
	it('should show the set image button and the label', () => {
		render(<ImageVideoDocumentSetUpExample />);
		const setImageButton = screen.getByText('SET IMAGE');
		const label = screen.getByText('Label');

		expect(label).toBeTruthy();
		expect(setImageButton).toBeTruthy();
	});
});

describe('ImageVideoDocumentSetUp card content', () => {
	beforeEach(() => {
		const { getByText } = render(<ImageVideoDocumentSetUpExample />);
		const setImageButton = getByText('SET IMAGE');
		fireEvent.click(setImageButton);
	});

	it('should show only the first 4 labels and values of the asset loaded', () => {
		const labelTitle = screen.getByText('Title');
		const valueTitle = screen.getByText('Test title');
		const labelType = screen.getByText('Type');
		const valueType = screen.getByText('Image');
		const labelAlt = screen.getByText('Alt');
		const valueAlt = screen.getByText('-');
		const labelSize = screen.getByText('Size');
		const valueSize = screen.getByText('1280x720');
		const labelFocus = screen.queryByText('Focus');
		const valueFocus = screen.queryByText('No');

		expect(labelTitle).toBeTruthy();
		expect(valueTitle).toBeTruthy();
		expect(labelType).toBeTruthy();
		expect(valueType).toBeTruthy();
		expect(labelAlt).toBeTruthy();
		expect(valueAlt).toBeTruthy();
		expect(labelSize).toBeTruthy();
		expect(valueSize).toBeTruthy();
		expect(labelFocus).toBe(null);
		expect(valueFocus).toBe(null);
	});

	it('should display the image', () => {
		const image = screen.getByTestId('image-test');

		expect(image).toBeTruthy();
	});
});

describe('ImageVideoDocumentSetUp menu options callbacks', () => {
	beforeEach(() => {
		const { container } = render(<ImageVideoDocumentSetUpExample />);
		const setImageButton = screen.getByText('SET IMAGE');
		fireEvent.click(setImageButton);
		const moreIcon = container.querySelector('.MuiButtonBase-root');
		fireEvent.click(moreIcon);
	});

	it('should trigger translate callback', () => {
		const translateOption = screen.getByText('Translate');
		fireEvent.click(translateOption);

		expect(translateCallback).toHaveBeenCalledTimes(1);
	});

	it('should trigger edit callback', () => {
		const editOption = screen.getByText('Edit');
		fireEvent.click(editOption);

		expect(editCallback).toHaveBeenCalledTimes(1);
	});
});

describe('ImageVideoDocumentSetUp browse callback', () => {
	it('should trigger browse translate callback', () => {
		render(<ImageVideoDocumentSetUpExample />);
		const setImageButton = screen.getByText('SET IMAGE');
		fireEvent.click(setImageButton);
		const browseButton = screen.getByText('Browse');
		fireEvent.click(browseButton);

		expect(browseCallback).toHaveBeenCalledTimes(1);
	});
});
