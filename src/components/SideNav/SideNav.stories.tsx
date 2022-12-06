import * as React from "react";
import { ReactElement, useState } from "react";
import { withKnobs, number, select } from "@storybook/addon-knobs";
import { Meta } from "@storybook/addon-docs/blocks";

// Components
import SideNav, { Link } from ".";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import CollectionsIcon from "@mui/icons-material/Collections";
import EventNoteIcon from "@mui/icons-material/EventNote";
import FolderIcon from "@mui/icons-material/Folder";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default {
	title: "Components/SideNav",
	decorators: [withKnobs],
} as Meta;

export const Example = (): ReactElement => {
	const [content, setContent] = useState<JSX.Element>(null);
	const links: Link[][] = [
		[
			{
				label: "Home",
				icon: HomeIcon,
				onClick: () => setContent(<h1>Home</h1>),
			},
			{
				label: "Accounts",
				icon: AccountCircleIcon,
				onClick: () => setContent(<h1>Accounts</h1>),
			},
			{
				label: "Gallery",
				icon: CollectionsIcon,
				onClick: () => setContent(<h1>Gallery</h1>),
			},
			{
				label: "Visitors",
				onClick: () => setContent(<h1>Visitors</h1>),
			},
			{
				label: "Sitemap",
				onClick: () => setContent(<h1>Sitemap</h1>),
			},
		],
		[
			{
				label: "Assets",
				onClick: () => setContent(<h1>Assets</h1>),
			},
			{
				label: "Map Publisher",
				onClick: () => setContent(<h1>Map Publisher</h1>),
			},
			{
				label: "Dynamic Content",
				onClick: () => setContent(<h1>Dynamic Content</h1>),
			},
		],
		[
			{
				label: "Tasks",
				badge: "10",
				icon: TaskAltIcon,
				onClick: () => setContent(<h1>Tasks</h1>),
				action: {
					icon: AddCircleOutlineIcon,
					onClick: () => alert("Add task clicked"),
				},
			},
			{
				label: "Documents",
				icon: FolderIcon,
				onClick: () => setContent(<h1></h1>),
			},
			{
				label: "Notes",
				badge: "00",
				icon: EventNoteIcon,
				onClick: () => setContent(<h1>Notes</h1>),
			},
		],
	];

	let linkLabels: string[] = ["Invalid link"]
	links.forEach(section => section.forEach(link => linkLabels = [...linkLabels, link.label]))

	const parentHeight = number("Parent height (px)", 500);
	const active = select("Active Link", linkLabels, linkLabels[2])

	return (
		<div style={{ display: "flex", height: parentHeight }}>
			<SideNav links={links} active={active} />
			<div>{content}</div>
		</div>
	);
};
