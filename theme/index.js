export const Darktheme = {
  dark: true,
  colors: {
    primary: "rgb(235, 64, 52)", // red
    onPrimary: "rgb(255, 255, 255)", // white text
    primaryContainer: "rgb(153, 28, 23)", // dark red container
    onPrimaryContainer: "rgb(255, 233, 232)", // light red text
    secondary: "rgb(104, 113, 127)", // blueish grey
    onSecondary: "rgb(255, 255, 255)", // white text
    secondaryContainer: "rgb(69, 75, 85)", // dark blueish grey container
    onSecondaryContainer: "rgb(217, 220, 225)", // light blueish grey text
    tertiary: "rgb(68, 138, 255)", // blue
    onTertiary: "rgb(255, 255, 255)", // white text
    tertiaryContainer: "rgb(21, 101, 192)", // dark blue container
    onTertiaryContainer: "rgb(227, 242, 253)", // light blue text
    error: "rgb(255, 180, 171)", // keep as is
    onError: "rgb(105, 0, 5)", // keep as is
    errorContainer: "rgb(147, 0, 10)", // keep as is
    onErrorContainer: "rgb(255, 180, 171)", // keep as is
    background: "rgb(30, 27, 30)", // keep as is
    onBackground: "rgb(232, 224, 229)", // keep as is
    surface: "rgb(30, 27, 30)", // keep as is
    onSurface: "rgb(232, 224, 229)", // keep as is
    surfaceVariant: "rgb(76, 68, 77)", // keep as is
    onSurfaceVariant: "rgb(206, 195, 205)", // keep as is
    outline: "rgb(151, 142, 151)", // keep as is
    outlineVariant: "rgb(76, 68, 77)", // keep as is
    shadow: "rgb(0, 0, 0)", // keep as is
    scrim: "rgb(0, 0, 0)", // keep as is
    inverseSurface: "rgb(232, 224, 229)", // keep as is
    inverseOnSurface: "rgb(51, 47, 51)", // keep as is
    inversePrimary: "rgb(140, 51, 179)", // keep as is
    elevation: {
      level0: "transparent",
      level1: "rgb(40, 35, 41)",
      level2: "rgb(46, 39, 48)",
      level3: "rgb(53, 44, 55)",
      level4: "rgb(55, 45, 57)",
      level5: "rgb(59, 48, 62)"
    },
    surfaceDisabled: "rgba(232, 224, 229, 0.12)", // keep as is
    onSurfaceDisabled: "rgba(232, 224, 229, 0.38)", // keep as is
    backdrop: "rgba(53, 46, 54, 0.4)", // keep as is
    custom0: "rgb(220, 184, 255)", // keep as is
    onCustom0: "rgb(71, 12, 122)", // keep as is
    custom0Container: "rgb(95, 43, 146)", // keep as is
    onCustom0Container: "rgb(240, 219, 255)", // keep as is
    text: '#fff' // keep as is
  }
};

export const Lighttheme = {
  colors: {
    primary: "rgb(235, 64, 52)", // red
    onPrimary: "rgb(255, 255, 255)", // white text
    primaryContainer: "rgb(153, 28, 23)", // dark red container
    onPrimaryContainer: "rgb(255, 233, 232)", // light red text
    secondary: "rgb(104, 113, 127)", // blueish grey
    onSecondary: "rgb(0, 0, 0)", // black text
    secondaryContainer: "rgb(176, 185, 201)", // light blueish grey container
    onSecondaryContainer: "rgb(0, 0, 0)", // black text
    tertiary: "rgb(68, 138, 255)", // blue
    onTertiary: "rgb(255, 255, 255)", // white text
    tertiaryContainer: "rgb(21, 101, 192)", // dark blue container
    onTertiaryContainer: "rgb(227, 242, 253)", // light blue text
    error: "rgb(255, 180, 171)", // keep as is
    onError: "rgb(0, 0, 0)", // keep as is
    errorContainer: "rgb(244, 204, 196)", // keep as is
    onErrorContainer: "rgb(0, 0, 0)", // keep as is
    background: "rgb(255, 255, 255)", // white background
    onBackground: "rgb(0, 0, 0)", // black text
    surface: "rgb(255, 255, 255)", // white surface
    onSurface: "rgb(0, 0, 0)", // black text
    surfaceVariant: "rgb(232, 224, 229)", // light surface variant
    onSurfaceVariant: "rgb(0, 0, 0)", // black text
    outline: "rgb(151, 142, 151)", // keep as is
    outlineVariant: "rgb(232, 224, 229)", // keep as is
    shadow: "rgba(0, 0, 0, 0.12)", // keep as is
    scrim: "rgba(0, 0, 0, 0.12)", // keep as is
    inverseSurface: "rgb(30, 27, 30)", // dark surface for inverse
    inverseOnSurface: "rgb(255, 255, 255)", // white text on inverse surface
    inversePrimary: "rgb(140, 51, 179)", // keep as is
    elevation: {
      level0: "transparent",
      level1: "rgb(245, 240, 247)", // lighter elevation
      level2: "rgb(240, 235, 242)", // lighter elevation
      level3: "rgb(235, 230, 238)", // lighter elevation
      level4: "rgb(230, 225, 233)", // lighter elevation
      level5: "rgb(225, 220, 228)" // lighter elevation
    },
    surfaceDisabled: "rgba(0, 0, 0, 0.12)", // lighter disabled surface
    onSurfaceDisabled: "rgba(0, 0, 0, 0.26)", // lighter disabled text
    backdrop: "rgba(232, 224, 229, 0.4)", // lighter backdrop
    custom0: "rgb(220, 184, 255)", // keep as is
    onCustom0: "rgb(0, 0, 0)", // black text
    custom0Container: "rgb(240, 219, 255)", // keep as is
    onCustom0Container: "rgb(0, 0, 0)", // black text
    text: '#000' // black font color
  }
};

// Nav themes
export const NavThemeLight = {
  dark: false,
  colors: {
    primary: Lighttheme.colors.primary,
    background: Lighttheme.colors.background,
    card: Lighttheme.colors.surface,
    text: Lighttheme.colors.text,
  }
};

export const NavThemeDark = {
  dark: true,
  colors: {
    primary: Darktheme.colors.primary,
    background: Darktheme.colors.background,
    card: Darktheme.colors.surface,
    text: Darktheme.colors.text,
  }
};
