import styled from "styled-components";
import theme from "@root/theme";
import { StyledTextField } from "@root/forms/FormFieldText/FormFieldText.styled";

// Components
import ClearIcon from "@mui/icons-material/Clear";

export const LocationSearchInputWrapper = styled.div`
	&.mapCoordinates {
		margin-bottom: 8px;
		margin-top: 15px;
	}
`;

export const StyledInputSearch = styled(StyledTextField)`
  min-width: 684px;

  &.MuiTextField-root {
    display: flex;
  }
`;

export const StyledClearIcon = styled(ClearIcon)`
  cursor: pointer;
  color: ${theme.newColors.almostBlack["100"]};
`;

export const SuggestionsContainer = styled.div`
  position: absolute;
  z-index: 9999;
  width: 100%;
  border: ${theme.borders.fieldGray};
  font-family: ${theme.fontFamily};
`;

export const SuggestionsDescriptionContainer = styled.div`
  	background-color: ${({ isSuggestionActive }) => isSuggestionActive ? theme.colors.gray200 : "white"};
  	cursor: pointer;
	padding: 6px 16px;
	width: 100%;
`;

export const SuggestionDescription = styled.p`
  font-size: 14px;
  margin: 0;

  &:active {
    color: ${theme.colors.gray800};
    font-weight: ${theme.fontWeight.bold};
  }
`;
