const baseTheme = {
  mode: "light",
  fonts: {
    primaryFont: "sofia-pro, sans-serif",
    secondaryFont: "",
    default: "sofia-pro, sans-serif",
  },
  zLayers: {
    hidden: -999,
    pageBanner: -5,
    behind: -1,
    default: 1,
    dropdown: 300,
    overlay: 400,
    modal: 500,
    globalUi: 600,
    globalUi2: 700,
    important: 999,
  },
  breakpoints: {
    mobile: "450px",
    xSmall: "600px",
    small: "750px",
    medium: "1000px",
    large: "1200px",
    xLarge: "1400px",
    xxLarge: "1550px",
    huge: "1920px",
    hugePlusOne: "1921px",
  },
  transitions: {
    default: "0.25s ease",
  },
  globalDimensions: {
    headerHeight: "80px",
    footerHeight: "104px",
    sideNavWidth: "130px",
    rolloutWidth: "300px",
    adminNavWidth: "335px",
    adminNavWidthSm: "80px",
  },
};

export type ThemeType = typeof baseTheme;

export default baseTheme;
