import {
  DarkTheme,
  DefaultTheme
} from '@react-navigation/native';
  

export const Darktheme = {
    dark: true,
    colors: {
      "colors": {
        "primary": "rgb(0, 87, 206)",
        "onPrimary": "rgb(255, 255, 255)",
        "primaryContainer": "rgb(218, 226, 255)",
        "onPrimaryContainer": "rgb(0, 25, 70)",
        "secondary": "rgb(192, 198, 220)",
        "onSecondary": "rgb(42, 48, 66)",
        "secondaryContainer": "rgb(64, 70, 89)",
        "onSecondaryContainer": "rgb(220, 226, 249)",
        "tertiary": "rgb(224, 187, 221)",
        "onTertiary": "rgb(65, 39, 66)",
        "tertiaryContainer": "rgb(89, 61, 89)",
        "onTertiaryContainer": "rgb(254, 215, 250)",
        "error": "rgb(255, 180, 171)",
        "onError": "rgb(105, 0, 5)",
        "errorContainer": "rgb(147, 0, 10)",
        "onErrorContainer": "rgb(255, 180, 171)",
        "background": "rgb(27, 27, 31)",
        "onBackground": "rgb(228, 226, 230)",
        "surface": "rgb(27, 27, 31)",
        "onSurface": "rgb(228, 226, 230)",
        "surfaceVariant": "rgb(68, 70, 79)",
        "onSurfaceVariant": "rgb(197, 198, 208)",
        "outline": "rgb(143, 144, 153)",
        "outlineVariant": "rgb(68, 70, 79)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(228, 226, 230)",
        "inverseOnSurface": "rgb(48, 48, 52)",
        "inversePrimary": "rgb(0, 87, 206)",
        "elevation": {
          "level0": "transparent",
          "level1": "rgb(35, 36, 42)",
          "level2": "rgb(39, 41, 49)",
          "level3": "rgb(44, 46, 56)",
          "level4": "rgb(45, 47, 58)",
          "level5": "rgb(48, 51, 62)"
        },
        "surfaceDisabled": "rgba(228, 226, 230, 0.12)",
        "onSurfaceDisabled": "rgba(228, 226, 230, 0.38)",
        "backdrop": "rgba(46, 48, 56, 0.4)",
        "text": 'rgb(255,255,255)'
      }
    }.colors
  };

  export const Lighttheme = {
    
    colors: {
      "colors": {
        "primary": "rgb(0, 87, 206)",
        "onPrimary": "rgb(255, 255, 255)",
        "primaryContainer": "rgb(218, 226, 255)",
        "onPrimaryContainer": "rgb(0, 25, 70)",
        "secondary": "rgb(88, 94, 113)",
        "onSecondary": "rgb(255, 255, 255)",
        "secondaryContainer": "rgb(220, 226, 249)",
        "onSecondaryContainer": "rgb(21, 27, 44)",
        "tertiary": "rgb(115, 85, 114)",
        "onTertiary": "rgb(255, 255, 255)",
        "tertiaryContainer": "rgb(254, 215, 250)",
        "onTertiaryContainer": "rgb(42, 18, 44)",
        "error": "rgb(186, 26, 26)",
        "onError": "rgb(255, 255, 255)",
        "errorContainer": "rgb(255, 218, 214)",
        "onErrorContainer": "rgb(65, 0, 2)",
        "background": "rgb(254, 251, 255)",
        "onBackground": "rgb(27, 27, 31)",
        "surface": "rgb(254, 251, 255)",
        "onSurface": "rgb(27, 27, 31)",
        "surfaceVariant": "rgb(225, 226, 236)",
        "onSurfaceVariant": "rgb(68, 70, 79)",
        "outline": "rgb(117, 119, 128)",
        "outlineVariant": "rgb(197, 198, 208)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(48, 48, 52)",
        "inverseOnSurface": "rgb(242, 240, 244)",
        "inversePrimary": "rgb(177, 197, 255)",
        "elevation": {
          "level0": "transparent",
          "level1": "rgb(241, 243, 253)",
          "level2": "rgb(234, 238, 251)",
          "level3": "rgb(226, 233, 250)",
          "level4": "rgb(224, 231, 249)",
          "level5": "rgb(218, 228, 248)"
        },
        "surfaceDisabled": "rgba(27, 27, 31, 0.12)",
        "onSurfaceDisabled": "rgba(27, 27, 31, 0.38)",
        "backdrop": "rgba(46, 48, 56, 0.4)",
        "text": 'rgb(0,0,0)'
      }}.colors
  };


  //Dont touch this controlls the theme based on your Light and Dark theme props to match the feel of you application
  export const NavThemeLight = {
    ...DefaultTheme,
    colors: {
    ...DefaultTheme.colors,
        primary: Lighttheme.colors.primary,
        background: Lighttheme.colors.background,
        card: Lighttheme.colors.surface,
        text: Lighttheme.colors.text,

    }
  };

  export const NavThemeDark = {
    ...DarkTheme,
    colors: {
    ...DarkTheme.colors,
    primary: Darktheme.colors.primary,
    background: Darktheme.colors.background,
    card: Darktheme.colors.surface,
    text: Darktheme.colors.text,
    }
  };