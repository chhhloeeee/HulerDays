import { createGlobalStyle } from 'styled-components';
import { darkVariables, lightVariables, sharedVariables } from './variables';
import { ThemeType } from './baseTheme';
import { scrollStyling } from './mixins';
import animations from './animations';
import reset from './reset';
import typography from './typography';

const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
	${reset}
	${animations}
	${typography}

	:root {
		${sharedVariables}

		${(props) => (props.theme.mode === 'dark' ? darkVariables : lightVariables)}
	}

	body,
	html {
		font-family: ${(props) => props.theme.fonts.primaryFont};
	}

	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	html {
		box-sizing: border-box;
		padding: 0;
		margin: 0;

		@media (max-width: ${(props) => props.theme.breakpoints.small}) {
			${scrollStyling}
			overflow-x: hidden !important;
			overflow-y: scroll;
		}
	}
	body {
		overscroll-behavior-y: none;
		@media (max-width: ${(props) => props.theme.breakpoints.small}) {
			height: auto;
		}
	}

	main {
		@media (max-width: ${(props) => props.theme.breakpoints.small}) {
			position: relative;
			height: auto;
			overflow: initial;
		}
	}

	button, input {
		font-family: ${(props) => props.theme.fonts.primaryFont};
	}
`;

export default GlobalStyles;
