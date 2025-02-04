import styled from "styled-components";
import theme from "@root/theme";

// Buttons should be 30/36 in height for small/medium in ALL variants
// The styling of text, outlined, and icon are shared. Contained are different because they usually need to get darker on hover/active than the primary color

export const ButtonWrapper = styled.span`
  display: inline-block;

  &.fullWidth {
    display: block;
  }

  & > button,
  & > a {
	font-family: ${theme.fontFamily};
	text-transform: none;
	font-size: 14px;
	font-weight: ${theme.fontWeight.bold};
	min-width: auto;
	line-height: 1.715;
	letter-spacing: 1px;
  }

  & > a {
	text-transform: uppercase;
  }

  &.normalButton > button {
    box-shadow: none;
  }

  &.normalButton > button > span > .icon {
    font-size: 20px;
  }

  &.normalButton.size_small > button {
    padding: 3px 12px;
  }

  &.normalButton.size_small.variant_outlined > button {
    padding-top: 1px;
    padding-bottom: 1px;
  }

  &.normalButton.size_medium.variant_outlined > button {
    padding-top: 4px;
    padding-bottom: 4px;
  }

  &.normalButton.size_small > button .icon_left,
  &.normalButton.size_small > a .icon_left {
    margin-right: 12px;
    margin-left: -4px;
    font-size: 16px;
  }

  &.normalButton.size_small > button .icon_right,
  &.normalButton.size_small > a .icon_right {
    margin-left: 12px;
    margin-right: -4px;
    font-size: 16px;
  }

  &.normalButton.size_medium > button .icon_left,
  &.normalButton.size_medium > a .icon_left {
    margin-right: 12px;
    margin-left: -4px;
    font-size: 16px;
  }

  &.normalButton.size_medium > button .icon_right,
  &.normalButton.size_medium > a .icon_right {
    margin-left: 12px;
    margin-right: -4px;
    font-size: 16px;
  }

  &.iconButton svg {
    font-size: ${theme.iconFontSize};
  }

  &.iconButton > button  {
    padding: 4px;
  }

  &.iconButton.size_small > button {
    padding: 3px;
  }

  &.iconButton.size_medium > button {
    // padding: 4px;
	margin: 2px;
  }

  .MuiTouchRipple-child {
      opacity: 0.5;
  }
`;

export const PopoverWrapper = styled.div`
  font-family: ${theme.fontFamily};
  padding: 10px;
`;

const BlackOnYellow = styled(ButtonWrapper)`
  & > button {
    color: ${theme.newColors.almostBlack["100"]};
    font-family: ${theme.fontFamily};
    height: auto;
    min-width: auto;
  }
`;

const GrayOnWhite = styled(ButtonWrapper)`
  & > button {
    color: ${theme.newColors.almostBlack["100"]};
    font-family: ${theme.fontFamily};
    height: auto;
    min-width: auto;
  }
`;

const TealOnWhite = styled(ButtonWrapper)`
  & > button {
    color: ${theme.newColors.realTeal["100"]};
  }

  & > button:hover {
		border-radius: 0;
    color: ${theme.newColors.darkerRealTeal[100]};
  }
`;

const RedOnWhite = styled(ButtonWrapper)`
  & > button {
    color: ${theme.newColors.darkRed["100"]};
    border-color: ${theme.newColors.darkRed["100"]};
    font-family: ${theme.fontFamily};
  }

  & > button:hover {
		background: ${theme.newColors.darkRed["20"]};
		border-radius: 0;
  }

  & > button:active,
  & > button:focus {
    background: ${theme.newColors.darkRed["20"]};
  }
`;

const BlackOnWhite = styled(ButtonWrapper)`
  & > button {
    color: ${theme.newColors.almostBlack["100"]};
    border-color: ${theme.colors.gray400};
  }

  & > button:hover {
    background: ${theme.colors.gray200};
		border-radius: 0;
  }

  & > button:active,
  & > button:focus {
    background: ${theme.colors.gray300};
  }
`;

const BlueOnWhite = styled(ButtonWrapper)`
  & > button {
    color: ${theme.colors.blue};
    border-color: ${theme.colors.blue};
  }

  & > button:hover {
    background: ${theme.colors.blue}12;
		border-radius: 0;
  }

  & > button:active,
  & > button:focus {
    background: ${theme.colors.blue}24;
  }
`;

const WhiteOnBlack = styled(ButtonWrapper)`
  & > button {
    color: ${theme.colors.white};
    border-color: ${theme.colors.white};
  }

  & > button:hover {
    background: ${theme.colors.white}30;
  }

  & > button:active,
  & > button:focus {
    background: ${theme.colors.white}60;
  }
`;

const textButtonStyles = {
	opacity: (disabled: boolean) => disabled ? 1 : 0.5,
	fontSize: (smallText: boolean) => smallText ? "14px" : "14px",
	lineHeight: 1.715
}

export const types = {
	yellow_contained: styled(BlackOnYellow)`
    & > button {
      background-color: ${theme.newColors.simplyGold["100"]};
      border-radius: 0;
      font-size: 14px;
      text-transform: uppercase;
    }

    .MuiButton-contained.Mui-disabled {
      color: ${theme.newColors.almostBlack["100"]};
      background-color: ${theme.newColors.simplyGold["100"]};
      opacity: 0.5;
    }

    & > button:hover {
      background-color: ${theme.newColors.darkerSimplyGold["100"]};
      color: ${theme.newColors.almostBlack["100"]};
    }
  `,

	blue_contained: styled(ButtonWrapper)`
    & > button {
      background: ${theme.colors.blue};
      border-radius: 0;
      color: white;
      font-size: 14px;
      text-transform: uppercase;
    }
    .MuiButton-contained.Mui-disabled {
      color: white;
      background-color: ${theme.colors.blue};
      opacity: 0.5;
    }
    & > button:hover {
      background: ${theme.colors.blueHover};
    }
    & > button:active,
    & > button:focus {
      background: ${theme.colors.blueActive};
    }
  `,
	lightBlue_contained: styled(ButtonWrapper)`
    & > button {
      background: ${theme.colors.blue}12;
      border-radius: 0;
      color: ${theme.colors.blue};
      font-size: 14px;
      text-transform: uppercase;
    }
    .MuiButton-contained.Mui-disabled {
      color: ${theme.colors.blue};
      background-color: ${theme.colors.blue}12;
      opacity: 0.5;
    }
    & > button:hover {
      background: ${theme.colors.blue}24;
    }
    & > button:active,
    & > button:focus {
      background: ${theme.colors.blue}32;
    }
  `,
	red_contained: styled(ButtonWrapper)`
    & > button {
      background: ${theme.newColors.darkRed["100"]};
      border-radius: 0;
      color: white;
      font-size: 14px;
      text-transform: uppercase;
    }
    .MuiButton-contained.Mui-disabled {
      color: white;
      background-color: ${theme.newColors.darkRed["100"]};
      opacity: 0.5;
    }
    & > button:hover {
      background: ${theme.newColors.darkerRed[100]};
    }
    & > button:active,
    & > button:focus {
      background: ${theme.colors.redActive};
    }
  `,
	black_contained: styled(ButtonWrapper)`
    & > button {
      background: ${theme.colors.gray200};
      border-radius: 0;
      color: ${theme.newColors.almostBlack["100"]};
      font-size: 14px;
      text-transform: uppercase;
    }
    .MuiButton-contained.Mui-disabled {
      color: ${theme.newColors.almostBlack["100"]};
      background-color: ${theme.colors.gray200};
      opacity: 0.5;
    }
    & > button:hover {
      background: ${theme.colors.gray300};
    }
    & > button:active,
    & > button:focus {
      background: ${theme.colors.gray400};
    }
  `,
	gray_outlined: styled(GrayOnWhite)`
    & > button {
      background-color: white;
      border: 2px solid ${theme.colors.simplyGray};
      border-radius: 0;
      font-size: 14px;
      text-transform: uppercase;
    }

    .MuiButton-outlined.Mui-disabled {
      background-color: white;
      border: 2px solid ${theme.colors.simplyGray};
      color: ${theme.newColors.almostBlack["100"]};
      opacity: 0.5;
    }

    & > button:hover {
      background-color: ${theme.colors.gray200};
      color: ${theme.newColors.almostBlack["100"]};
			border: 2px solid ${theme.colors.simplyGray};
    }
  `,
	teal_outlined: styled(TealOnWhite)`
    & > button {
      background-color: white;
      border-radius: 0;
      border: 2px solid ${theme.newColors.realTeal["100"]};
      font-size: 14px;
      text-transform: uppercase;
    }

    .MuiButton-outlined.Mui-disabled {
      background-color: white;
      border: 2px solid ${theme.newColors.realTeal["100"]};
      color: ${theme.newColors.realTeal["100"]};
      opacity: 0.5;
    }

    & > button:hover {
      background-color: ${theme.newColors.realTeal["20"]};
      color: ${theme.newColors.realTeal["100"]};
			border: 2px solid ${theme.newColors.realTeal["100"]};
    }
  `,
	blue_outlined: styled(BlueOnWhite)`
    & > button {
      background-color: white;
      border-radius: 0;
      border: 2px solid ${theme.colors.blue};
      font-size: 14px;
      text-transform: uppercase;
    }

    .MuiButton-outlined.Mui-disabled {
      background-color: white;
      opacity: 0.5;
      border: 2px solid ${theme.colors.blue};
      color: ${theme.colors.blue};
    }

    & > button:hover {
      box-shadow: 0 2px 3px ${theme.colors.blue}12;
			border: 2px solid ${theme.colors.blue};
    }

    & > button:active,
    & > button:focus {
      box-shadow: 0 1px 2px ${theme.colors.blue}24;
    }
  `,
	red_outlined: styled(RedOnWhite)`
    & > button {
      background-color: white;
      border-radius: 0;
      border: 2px solid ${theme.newColors.darkRed["100"]};
      font-size: 14px;
      text-transform: uppercase;
    }

    .MuiButton-outlined.Mui-disabled {
      background-color: white;
      opacity: 0.5;
      border: 2px solid ${theme.newColors.darkRed["100"]};
      color: ${theme.newColors.darkRed["100"]};
    }

    & > button:hover {
      background-color: ${theme.newColors.darkRed["20"]};
      color: ${theme.newColors.darkRed["100"]};
			border: 2px solid ${theme.newColors.darkRed["100"]};
    }

    & > button:active,
    & > button:focus {
      box-shadow: 0 1px 2px ${theme.newColors.darkRed["20"]};
    }
  `,
	black_outlined: styled(BlackOnWhite)`
		& > button {
			background-color: white;
			border-radius: 0;
			border: 2px solid ${theme.newColors.almostBlack["100"]};
			font-size: 14px;
			text-transform: uppercase;
		}
		.MuiButton-outlined.Mui-disabled {
			background-color: white;
			opacity: 0.5;
			border: 2px solid ${theme.newColors.almostBlack["100"]};
			color: ${theme.newColors.almostBlack["100"]};
		}
		& > button:hover {
			box-shadow: 0 2px 3px ${theme.newColors.almostBlack["20"]};
			border: 2px solid ${theme.newColors.almostBlack["100"]};
		}
		& > button:active,
		& > button:focus {
			box-shadow: 0 1px 2px ${theme.newColors.almostBlack["100"]};
		}
  `,
	teal_text: styled(TealOnWhite)`
		&.normalButton > button {
			color: ${theme.newColors.realTeal["100"]};
			opacity: ${({ children }) => textButtonStyles.opacity(!children[0].props.disabled)};

			&:hover {
				color: ${({ children }) => !children[0].props.disabled ? theme.newColors.darkerRealTeal[100] : ""};
			}
		}

		& > button {
			font-size: ${({ smallText }) => textButtonStyles.fontSize(smallText)};
			line-height: ${textButtonStyles.lineHeight};
		}
  `,
	blue_text: styled(BlueOnWhite)`
		&.normalButton > button {
			color: ${theme.colors.blue};
			opacity: ${({ children }) => textButtonStyles.opacity(!children[0].props.disabled)};
		}

		& > button {
			font-size: ${({ smallText }) => textButtonStyles.fontSize(smallText)};
			line-height: ${textButtonStyles.lineHeight};
		}
  `,
	red_text: styled(RedOnWhite)`
		&.normalButton > button {
			color: ${theme.newColors.darkRed["100"]};
			opacity: ${({ children }) => textButtonStyles.opacity(!children[0].props.disabled)};
		}

		& > button {
			font-size: ${({ smallText }) => textButtonStyles.fontSize(smallText)};
			line-height: ${textButtonStyles.lineHeight};
		}
  `,
	black_text: styled(BlackOnWhite)`
		&.normalButton > button {
			color: ${theme.newColors.almostBlack};
			opacity: ${({ children }) => textButtonStyles.opacity(!children[0].props.disabled)};
		}

		& > button, & > a {
			font-size: ${({ smallText }) => textButtonStyles.fontSize(smallText)};
			line-height: ${textButtonStyles.lineHeight};
		}

		& > a {
			color: ${theme.newColors.almostBlack};
			text-transform: capitalize;
			font-weight: ${theme.fontWeight.bold};
		}

		& > a:hover {
			text-decoration: underline;
		}
  `,
	blue_icon: BlueOnWhite,
	black_icon: BlackOnWhite,
	teal_icon: TealOnWhite,
	red_icon: RedOnWhite,
	white_icon: WhiteOnBlack,
	gray_icon: styled(GrayOnWhite)`
		& > button {
			color: ${theme.colors.gray600};
		}

		& > button:hover {
			color: ${theme.newColors.almostBlack};
		}
  `,
};

export const TooltipContent = styled.div`
  z-index: 100;
  background: ${theme.newColors.almostBlack};
  color: white;
  padding: 4px 8px;
  margin-top: 4px;
  border-radius: 4px;
  color: white;
  font-family: ${theme.fontFamily};
  font-size: 12px;
  margin: 12px 0px;
  max-width: 200px;
`;
