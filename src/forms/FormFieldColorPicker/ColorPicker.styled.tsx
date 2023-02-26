import styled from "styled-components";
import theme from "@root/theme";

export const ColorContainer = styled.div`
  background: ${theme.newColors.grey1["100"]};
  border: ${theme.borders.simplyGrey};
  margin-bottom: ${(pr) => (pr.displayColorPicker ? "8px" : 0)};
  opacity: ${(pr) => (pr.disabled ? 0.5 : 1)};
  padding: 10px;
  width: fit-content;
`;

export const ColorDiv = styled.div`
  ${({ color }) => {
		if (
			color.r !== undefined &&
      color.b !== undefined &&
      color.b !== undefined &&
      color.a !== undefined
		) {
			return `background: rgba(${color.r}, ${color.g}, ${color.b}, ${color.a});`;
		} else {
			return `background: ${color};`;
		}
	}}
  cursor: ${(pr) => (!pr.disabled ? "pointer" : "auto")};
  height: 31px;
  pointer-events: ${(pr) => (!pr.disabled ? "auto" : "none")};
  width: 80px;
`;

export const PopOver = styled.div`
  position: absolute;
  z-index: 2;
`;
