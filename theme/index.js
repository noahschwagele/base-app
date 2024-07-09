export const Darktheme = {
    dark: true,
    colors: {
      "colors": {
        "primary": "rgb(235, 178, 255)",
        "onPrimary": "rgb(82, 0, 113)",
        "primaryContainer": "rgb(114, 17, 153)",
        "onPrimaryContainer": "rgb(248, 216, 255)",
        "secondary": "rgb(212, 192, 215)",
        "onSecondary": "rgb(57, 44, 61)",
        "secondaryContainer": "rgb(80, 66, 85)",
        "onSecondaryContainer": "rgb(241, 220, 244)",
        "tertiary": "rgb(245, 183, 181)",
        "onTertiary": "rgb(76, 37, 36)",
        "tertiaryContainer": "rgb(102, 59, 57)",
        "onTertiaryContainer": "rgb(255, 218, 216)",
        "error": "rgb(255, 180, 171)",
        "onError": "rgb(105, 0, 5)",
        "errorContainer": "rgb(147, 0, 10)",
        "onErrorContainer": "rgb(255, 180, 171)",
        "background": "rgb(30, 27, 30)",
        "onBackground": "rgb(232, 224, 229)",
        "surface": "rgb(30, 27, 30)",
        "onSurface": "rgb(232, 224, 229)",
        "surfaceVariant": "rgb(76, 68, 77)",
        "onSurfaceVariant": "rgb(206, 195, 205)",
        "outline": "rgb(151, 142, 151)",
        "outlineVariant": "rgb(76, 68, 77)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(232, 224, 229)",
        "inverseOnSurface": "rgb(51, 47, 51)",
        "inversePrimary": "rgb(140, 51, 179)",
        "elevation": {
          "level0": "transparent",
          "level1": "rgb(40, 35, 41)",
          "level2": "rgb(46, 39, 48)",
          "level3": "rgb(53, 44, 55)",
          "level4": "rgb(55, 45, 57)",
          "level5": "rgb(59, 48, 62)"
        },
        "surfaceDisabled": "rgba(232, 224, 229, 0.12)",
        "onSurfaceDisabled": "rgba(232, 224, 229, 0.38)",
        "backdrop": "rgba(53, 46, 54, 0.4)",
        "custom0": "rgb(220, 184, 255)",
        "onCustom0": "rgb(71, 12, 122)",
        "custom0Container": "rgb(95, 43, 146)",
        "onCustom0Container": "rgb(240, 219, 255)",
        "text": '#fff'
      }
    }.colors
  };

  export const Lighttheme = {
    
    colors: {
            "colors": {
              "primary": "rgb(140, 51, 179)", // lighter purple
              "onPrimary": "rgb(255, 255, 255)", // white text
              "primaryContainer": "rgb(95, 43, 146)", // lighter purple container
              "onPrimaryContainer": "rgb(0, 0, 0)", // black text
              "secondary": "rgb(176, 159, 177)", // lighter greyish purple
              "onSecondary": "rgb(0, 0, 0)", // black text
              "secondaryContainer": "rgb(200, 185, 201)", // lighter greyish purple container
              "onSecondaryContainer": "rgb(0, 0, 0)", // black text
              "tertiary": "rgb(245, 183, 181)", // keep as is
              "onTertiary": "rgb(0, 0, 0)", // black text
              "tertiaryContainer": "rgb(232, 212, 211)", // lighter pinkish container
              "onTertiaryContainer": "rgb(0, 0, 0)", // black text
              "error": "rgb(255, 180, 171)", // keep as is
              "onError": "rgb(0, 0, 0)", // black text
              "errorContainer": "rgb(244, 204, 196)", // lighter error container
              "onErrorContainer": "rgb(0, 0, 0)", // black text
              "background": "rgb(232, 224, 229)", // lighter background
              "onBackground": "rgb(0, 0, 0)", // black text
              "surface": "rgb(255, 255, 255)", // white surface
              "onSurface": "rgb(0, 0, 0)", // black text
              "surfaceVariant": "rgb(232, 224, 229)", // lighter surface variant
              "onSurfaceVariant": "rgb(0, 0, 0)", // black text
              "outline": "rgb(151, 142, 151)", // keep as is
              "outlineVariant": "rgb(232, 224, 229)", // lighter outline variant
              "shadow": "rgba(0, 0, 0, 0.12)", // lighter shadow
              "scrim": "rgba(0, 0, 0, 0.12)", // lighter scrim
              "inverseSurface": "rgb(30, 27, 30)", // darker surface for inverse
              "inverseOnSurface": "rgb(255, 255, 255)", // white text on inverse surface
              "inversePrimary": "rgb(235, 178, 255)", // keep as is
              "elevation": {
                "level0": "transparent",
                "level1": "rgb(245, 240, 247)", // lighter elevation
                "level2": "rgb(240, 235, 242)", // lighter elevation
                "level3": "rgb(235, 230, 238)", // lighter elevation
                "level4": "rgb(230, 225, 233)", // lighter elevation
                "level5": "rgb(225, 220, 228)" // lighter elevation
              },
              "surfaceDisabled": "rgba(0, 0, 0, 0.12)", // lighter disabled surface
              "onSurfaceDisabled": "rgba(0, 0, 0, 0.26)", // lighter disabled text
              "backdrop": "rgba(232, 224, 229, 0.4)", // lighter backdrop
              "custom0": "rgb(220, 184, 255)", // keep as is
              "onCustom0": "rgb(0, 0, 0)", // black text
              "custom0Container": "rgb(240, 219, 255)", // lighter custom container
              "onCustom0Container": "rgb(0, 0, 0)", // black text
              "text": '#000' // black font color
            }
                    
    }.colors
  };


  //Dont touch this controlls the theme based on your Light and Dark theme props to match the feel of you application
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