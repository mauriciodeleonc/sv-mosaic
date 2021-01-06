import * as React from "react";
import { useState, useContext, useMemo } from "react";
import styled from "styled-components";
import Popper from "@material-ui/core/Popper";
import { PopperProps } from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import { throttle } from "lodash";

import { LeftNavItemDef, LeftNavContext } from "./LeftNavTypes";
import LeftNavTitle from "./LeftNavTitle";
import LeftNavItems from "./LeftNavItems";
import LeftNavScroller from "./LeftNavScroller";

const StyledDiv = styled.div`
	&.paper {
		background-color: #404045;
		max-width: 250px;
		max-height: 80vh;
		display: flex;
	}
`;

// set aside the popperProps so they do not mutate between renders, cause the Popper system to go haywire and move the component around strangely
const popperProps: Pick<PopperProps, "open" | "placement" | "modifiers"> = {
	open : true,
	placement : "right",
	modifiers : {
		preventOverflow : {
			enabled : true,
			boundariesElement: "viewport"
		},
		// this prevents popper from using translated3d which causes blurry
		// flyouts in Chrome, instead it will just use top/left positioning
		computeStyle : {
			enabled : true,
			gpuAcceleration : false
		}
	}
}

interface Props {
	parent: LeftNavItemDef
	anchorEl: HTMLElement
}

function LeftNavFlyout(props: Props) {
	const [state, setState] = useState({
		openName : undefined
	});

	const leftNavContext = useContext(LeftNavContext);

	const onOpen = openName => {
		setState({
			...state,
			openName
		})
	}

	const onScroll = throttle(function(e) {
		// this scroll listener is being triggered when a scroll occurs within a child, which we don't want
		// so we only trigger if the scroll event happened on this specific flyout
		if (e.target !== e.currentTarget) { return; }

		if (state.openName === undefined) { return; }

		setState({
			...state,
			openName : undefined
		});
	}, 100, { leading : true, trailing : false });

	const scrollerAttrs = {
		onScroll
	}

	const style = useMemo(() => ({
		zIndex : leftNavContext.zIndex + 1
	}), [leftNavContext.zIndex]);

	return (
		<Popper
			{...popperProps}
			anchorEl={props.anchorEl}
			style={style}
		>
			<Paper elevation={3} component={StyledDiv} className="paper">
				<LeftNavScroller attrs={scrollerAttrs}>
					<LeftNavTitle label={props.parent.label}/>
					<LeftNavItems
						items={props.parent.items}
						openName={state.openName}
						onOpen={onOpen}
					/>
				</LeftNavScroller>
			</Paper>
		</Popper>
	)
}

export default LeftNavFlyout;