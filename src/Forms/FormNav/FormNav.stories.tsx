import * as React from 'react';
import { ReactElement } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta } from '@storybook/addon-docs/blocks';

// Components
import FormNav from './FormNav';
import { MainLayout, Section } from './FormNav.styled';

export default {
	title: 'Forms|FormNav',
	decorators: [withKnobs],
} as Meta;

const sections = [
	{
		name: 'Account Profile',
		id: 'section1',
	},
	{
		name: 'Account Information',
		id: 'section2',
	},
	{
		name: 'Contact Information',
		id: 'section3',
	},
	{
		name: 'Address Information',
		id: 'section4',
	},
	{
		name: 'Tags and User',
		id: 'section5',
	},
	{
		name: 'Connections',
		id: 'section6',
	}
];

export const Example = (): ReactElement => {
	return (
		<MainLayout>
			<FormNav sections={sections} />
			<div>
				<Section id='section1'>
					<h1>Account Profile</h1>
					<p>
            Try to scroll this section and look at the navigation bar while
            scrolling! Try to scroll this section and look at the navigation bar
            while scrolling!
					</p>
					<p>
            Try to scroll this section and look at the navigation bar while
            scrolling! Try to scroll this section and look at the navigation bar
            while scrolling!
					</p>
				</Section>
				<Section id='section2'>
					<h1>Account Information</h1>
					<p>
            Try to scroll this section and look at the navigation bar while
            scrolling! Try to scroll this section and look at the navigation bar
            while scrolling!
					</p>
					<p>
            Try to scroll this section and look at the navigation bar while
            scrolling! Try to scroll this section and look at the navigation bar
            while scrolling!
					</p>
				</Section>
				<Section id='section3'>
					<h1>Contact Information</h1>
					<p>
            Try to scroll this section and look at the navigation bar while
            scrolling! Try to scroll this section and look at the navigation bar
            while scrolling!
					</p>
					<p>
            Try to scroll this section and look at the navigation bar while
            scrolling! Try to scroll this section and look at the navigation bar
            while scrolling!
					</p>
				</Section>
				<Section id='section4'>
					<h1>Address Information</h1>
					<p>
            Try to scroll this section and look at the navigation bar while
            scrolling! Try to scroll this section and look at the navigation bar
            while scrolling!
					</p>
					<p>
            Try to scroll this section and look at the navigation bar while
            scrolling! Try to scroll this section and look at the navigation bar
            while scrolling!
					</p>
				</Section>
				<Section id='section5'>
					<h1>Tags and User</h1>
					<p>
            Try to scroll this section and look at the navigation bar while
            scrolling! Try to scroll this section and look at the navigation bar
            while scrolling!
					</p>
					<p>
            Try to scroll this section and look at the navigation bar while
            scrolling! Try to scroll this section and look at the navigation bar
            while scrolling!
					</p>
				</Section>
				<Section id='section6'>
					<h1>Connections</h1>
					<p>
            Try to scroll this section and look at the navigation bar while
            scrolling! Try to scroll this section and look at the navigation bar
            while scrolling!
					</p>
					<p>
            Try to scroll this section and look at the navigation bar while
            scrolling! Try to scroll this section and look at the navigation bar
            while scrolling!
					</p>
				</Section>
			</div>
		</MainLayout>
	);
};
