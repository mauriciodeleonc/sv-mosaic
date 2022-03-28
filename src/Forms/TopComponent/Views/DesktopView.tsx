import * as React from "react";
import { memo, ReactElement } from "react";

// Components
import FormNav from "@root/forms/FormNav";

// Styled components
import styled from "styled-components";
import {
	FlexContainer,
	StyledColumn
} from "../TopComponent.styled";

// Utils
import { BREAKPOINTS } from "@root/theme/theme";
import TitleWrapper from "../Utils/TitleWrapper";
import { BaseTopComponentProps, TopComponentProps } from "../TopComponentTypes";

const BIG_SCREEN_BREAKPOINT = BREAKPOINTS.topComponent.bigScreenView + "px";

const DesktopViewColumn = styled(StyledColumn)`
  justify-content: space-between;
  padding: 24px 20px 0px 20px;
  top: 0;
  z-index: 99999;

  @media (min-width: ${BIG_SCREEN_BREAKPOINT}) {
    box-shadow: 0px 1px 10px #0000001a;
    height: 66px;
    margin-bottom: 0px;
    padding: 24px 20px 16px 20px;
  }
`;

const DesktopActionsRow = styled(FlexContainer)`
  align-items: flex-start;

  button:last-child {
    margin-left: 20px;
  }

  .MuiFormControlLabel-root {
    margin-right: 20px;
  }
`;

const DesktopTitleActionsRow = styled(FlexContainer)`
  margin-bottom: 30px;
`;

type DesktopViewProps = {
	buttons: JSX.Element;
	sections: TopComponentProps["sections"];
	checkbox: JSX.Element;
} & BaseTopComponentProps;

const DesktopView = (props: DesktopViewProps): ReactElement => {
	const {
		title,
		description,
		tooltipInfo,
		helpIcon,
		showActive,
		buttons,
		sections,
		checkbox,
		view,
	} = props;

	return (
		<DesktopViewColumn>
			<DesktopTitleActionsRow>
				<TitleWrapper
					title={title}
					description={description}
					view={view}
				/>
				<DesktopActionsRow>
					{tooltipInfo && helpIcon}
					{showActive && checkbox}
					{buttons}
				</DesktopActionsRow>
			</DesktopTitleActionsRow>
			{(view !== "BIG_DESKTOP" && sections) && (
				<FlexContainer>
					<FormNav sections={sections} />
				</FlexContainer>
			)}
		</DesktopViewColumn>
	);
};

export default memo(DesktopView);