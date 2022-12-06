import styled from "styled-components";
import theme from "@root/theme";
import ButtonRow from "../ButtonRow";

export const StyledWrapper = styled.div`
  & {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
`;

export const StyledButtonRow = styled(ButtonRow)`
  .button + .normalButton {
    margin: 0;
  }

  .button:first-child {
    border-right: 2px solid ${theme.colors.gray200};
    padding-right: 8px;
  }

  .button:last-child {
    padding-left: 8px;
  }
`;
