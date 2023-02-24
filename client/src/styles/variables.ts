import { css } from 'styled-components';

const sharedVariables = css`
  --huler-logo: url(/img/branding/huler-logo.svg);
  --primary-color: #fb6664;
  --primary-color-readable: #f95853;
  --primary-color-rgb: 252, 102, 101;
  --light-mode-primary: #fb6664;
  --light-mode-primary-rgb: 252, 102, 101;
  --dark-mode-primary: #fb6664;
  --dark-mode-primary-rgb: 252, 102, 101;
  --huler-orange-light: '';
  --glow: 0 0px 20px 4px var(--primary-color);

  // Greys
  --white: #ffffff;
  --black: #000000;
  --grey-10: #f5f5f5;
  --grey-10-rgb: 245, 245, 245;
  --grey-20: #e9e9ea;
  --grey-30: #e4e4e4;
  --grey-40: #ededed;
  --grey-70: #ddddde;
  --grey-80: #b8b8b8;
  --grey-100: #807e84;
  --grey-200: #515159;
  --grey-300: #413f49;
  --grey-500: #2e2c35;
  --grey-600: #212028;
  --grey-700: #1c1b22;
  --grey-700-rgb: 28, 27, 34;
  --grey-800: #17161c;
  --grey-900: #101014;
`;

const lightVariables = css`
  // Dynamic properties
  --primary-color: var(--light-mode-primary);
  --primary-color-rgb: var(--light-mode-primary-rgb);
  --contrast: var(--black);

  // Elements
  --background: var(--grey-10);
  --background-rgb: var(--grey-10-rgb);
  --panel-background: var(--white);
  --footer-background: rgba(255, 255, 255, 0.9);
  --modal-container: rgba(152, 152, 152, 0.6);
  --modal-inner: rgba(255, 255, 255, 0.85);
  --background-title: var(--grey-30);
  --scrollbar: var(--grey-300);
  --border: var(--grey-80);
  --border-darker: var(--grey-700);
  --bookmark-input-background: var(--grey-10);
  --bookmark-import-panel: var(--grey-20);
  --shared-url-background: var(--white);
  --shared-url-border: var(--grey-80);
  --unseen-notification: var(--grey-20);
  --user-search-background: var(--white);
  --user-search-item-background-hover: var(--grey-60);
  --user-search-item-background-locked: var(--grey-40);
  --text-editor-toolbar-background: var(--grey-80);
  --admin-nav-dropdown-shadow: 0 0 10px var(--grey-20);
  --bubble-background: var(--grey-20);
  --bubble-text: var(--grey-60);
  --badge-background: var(--light-mode-primary);
  --badge-text: var(--white);
  --focused-message-background: var(--grey-10);

  // Tiles
  --empty-tile-background: var(--white);
  --placeholder-tile-background: var(--grey-70);
  --empty-collection-background-1: var(--white);
  --empty-collection-background-2: var(--grey-10);
  --empty-collection-background-3: var(--grey-20);
  --empty-collection-background-4: var(--grey-30);

  // Buttons
  --circle-button-border: var(--grey-80);
  --secondary-button-background: var(--grey-80);
  --secondary-button-color: var(--grey-900);
  --outline-button-border: var(--black);
  --outline-button-background: var(--black);
  --outline-button-color: var(--black);
  --outline-button-color-hover: var(--white);
  --muted-button-background: var(--white);
  --toggle-off-background: var(--grey-30);
  --toggle-on-background: var(--white);
  --toggle-knob-background: var(--white);
  --soft-button-color: var(--grey-80);
  --admin-circle-button-background: var(--grey-30);
  --admin-circle-button-background-hover: var(--grey-40);
  --admin-circle-button-color: var(--grey-100);
  --admin-circle-button-color-hover: var(--black);
  --admin-circle-button-border: var(--grey-80);
  --admin-circle-button-border-hover: var(--grey-100);

  // Forms
  --select-options-background: var(--grey-20);
  --select-options-option-background: var(--grey-60);
  --selected-option-background: var(--white);
  --label-color: var(--grey-200);
  --radio-button-background: var(--grey-80);
  --search-input-border: var(--grey-80);
  --search-input-placeholder: var(--grey-900);
  --search-input-text: var(--grey-900);

  // Shadows
  --soft-button-shadow: -2px -2px 5px #ffffff30, -2px -2px 5px #ffffff30, 0 0 15px #ffffff30, 5px 5px 10px #00000010;
  --hover-button-shadow: -3px -3px 6px #ffffff30, -3px -3px 6px #ffffff30, 0 0 16px #ffffff30, 6px 6px 11px #00000010;
  --admin-background-shadow: 8px 8px 13px #00000008, -8px -8px 13px #00000008;
  --tile-shadow-color: rgba(0, 0, 0, 0.4);
  --recognition-card-shadow: 0px 20px 40px #2a2a3161;
  --focused-message-box-shadow: 10px 10px 16px #51515929;

  // Text
  --title-color: var(--black);
  --body-text-color: var(--black);
  --secondary-text-color: var(--grey-100);
  --hub-welcome-text-color: var(--grey-80);

  // Tables
  --table-row-border: var(--grey-30);
  --table-row-background-hover: var(--grey-20);
  --table-row-background-locked: var(--grey-40);
  --table-actions-background: var(--grey-20);

  // Recognition
  --recognition-tab-active: var(--primary-color);
  --recognition-tab-inactive: var(--grey-100);

  // Icons
  --icon-contrast-1: var(--grey-900);
`;

const darkVariables = css`
  // Dynamic properties
  --primary-color: var(--dark-mode-primary);
  --primary-color-rgb: var(--dark-mode-primary-rgb);
  --contrast: var(--white);

  // Elements
  --background: var(--grey-700);
  --background-rgb: var(--grey-700-rgb);
  --panel-background: var(--grey-900);
  --footer-background: rgba(0, 0, 0, 0.9);
  --modal-container: rgba(41, 41, 49, 0.9);
  --modal-inner: rgba(28, 27, 33, 0.7);
  --background-title: var(--grey-900);
  --scrollbar: var(--grey-300);
  --border: var(--grey-300);
  --border-darker: var(--grey-700);
  --bookmark-input-background: var(--grey-900);
  --bookmark-import-panel: var(--grey-700);
  --shared-url-background: var(--grey-900);
  --shared-url-border: var(--grey-200);
  --unseen-notification: var(--black);
  --user-search-background: var(--grey-900);
  --user-search-item-background-hover: var(--grey-700);
  --user-search-item-background-locked: var(--black);
  --text-editor-toolbar-background: var(--grey-500);
  --admin-nav-dropdown-shadow: 0 0 10px var(--grey-700);
  --bubble-background: var(--grey-600);
  --bubble-text: var(--white);
  --badge-background: var(--dark-mode-primary);
  --badge-text: var(--black);
  --focused-message-background: var(--grey-900);
  --focused-message-box-shadow: var(--black);

  // Tiles
  --empty-tile-background: var(--grey-900);
  --placeholder-tile-background: var(--grey-500);
  --empty-collection-background-1: var(--black);
  --empty-collection-background-2: var(--grey-900);
  --empty-collection-background-3: var(--grey-800);
  --empty-collection-background-4: var(--grey-600);

  // Buttons
  --circle-button-border: var(--grey-300);
  --secondary-button-background: var(--white);
  --secondary-button-color: var(--grey-900);
  --outline-button-border: var(--white);
  --outline-button-background: var(--white);
  --outline-button-color: var(--white);
  --outline-button-color-hover: var(--black);
  --muted-button-background: var(--grey-600);
  --toggle-off-background: var(--grey-900);
  --toggle-on-background: var(--grey-300);
  --toggle-knob-background: var(--grey-700);
  --soft-button-color: var(--grey-200);
  --admin-circle-button-background: var(--grey-500);
  --admin-circle-button-background-hover: var(--grey-600);
  --admin-circle-button-color: var(--grey-100);
  --admin-circle-button-color-hover: var(--white);
  --admin-circle-button-border: var(--grey-300);
  --admin-circle-button-border-hover: var(--grey-500);

  // Forms
  --select-options-background: var(--grey-500);
  --select-options-option-background: var(--grey-700);
  --selected-option-background: var(--grey-900);
  --label-color: var(--grey-80);
  --radio-button-background: var(--grey-300);
  --search-input-border: var(--grey-200);
  --search-input-placeholder: var(--white);
  --search-input-text: var(--white);

  // Shadows
  --soft-button-shadow: -2px -2px 5px #65656d1f, -2px -2px 5px #65656d1f, 0 0 15px #65656d1f, 5px 5px 10px #00000057;
  --hover-button-shadow: -5px -5px 8px #65656d1f, -5px -5px 8px #65656d1f, 0 0 18px #65656d1f, 8px 8px 13px #00000057;
  --admin-background-shadow: 8px 8px 13px #0000001c, -8px -8px 13px #31313aba;
  --tile-shadow-color: #000000;
  --recognition-card-shadow: 0px 20px 40px #1c1c2152;
  --focused-message-box-shadow: 10px 10px 16px #00000029;

  // Text
  --title-color: var(--white);
  --body-text-color: var(--white);
  --secondary-text-color: var(--grey-80);
  --hub-welcome-text-color: var(--grey-200);

  // Tables
  --table-row-border: var(--grey-600);
  --table-row-background-locked: var(--grey-600);
  --table-row-background-hover: var(--grey-500);
  --table-actions-background: var(--grey-800);

  // Recognition
  --recognition-tab-active: var(--primary-color);
  --recognition-tab-inactive: var(--grey-100);

  // Icons
  --icon-contrast-1: var(--white);
`;

export { sharedVariables, lightVariables, darkVariables };
