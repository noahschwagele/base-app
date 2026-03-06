import {
  DarkTheme,
  DefaultTheme
} from '@react-navigation/native';

const sharedTokens = {
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    pill: 999,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
};

const lightPalette = {
  primary: 'rgb(71, 85, 182)',
  onPrimary: 'rgb(255, 255, 255)',
  primaryContainer: 'rgb(223, 224, 255)',
  onPrimaryContainer: 'rgb(0, 13, 95)',
  secondary: 'rgb(91, 93, 114)',
  onSecondary: 'rgb(255, 255, 255)',
  background: 'rgb(255, 251, 255)',
  surface: 'rgb(255, 251, 255)',
  surfaceAlt: 'rgb(227, 225, 236)',
  border: 'rgb(199, 197, 208)',
  text: 'rgb(27, 27, 31)',
  textMuted: 'rgb(70, 70, 79)',
  link: 'rgb(52, 152, 219)',
  danger: 'rgb(186, 26, 26)',
  success: 'rgb(39, 124, 62)',
  shadow: 'rgb(0, 0, 0)',
};

const darkPalette = {
  primary: 'rgb(187, 195, 255)',
  onPrimary: 'rgb(17, 34, 134)',
  primaryContainer: 'rgb(45, 60, 156)',
  onPrimaryContainer: 'rgb(223, 224, 255)',
  secondary: 'rgb(196, 197, 221)',
  onSecondary: 'rgb(45, 47, 66)',
  background: 'rgb(27, 27, 31)',
  surface: 'rgb(35, 35, 42)',
  surfaceAlt: 'rgb(46, 47, 58)',
  border: 'rgb(70, 70, 79)',
  text: 'rgb(228, 225, 230)',
  textMuted: 'rgb(199, 197, 208)',
  link: 'rgb(135, 201, 255)',
  danger: 'rgb(255, 180, 171)',
  success: 'rgb(154, 220, 175)',
  shadow: 'rgb(0, 0, 0)',
};

const buildTheme = ({ mode, palette }) => ({
  name: mode,
  dark: mode === 'dark',
  colors: {
    primary: palette.primary,
    onPrimary: palette.onPrimary,
    primaryContainer: palette.primaryContainer,
    onPrimaryContainer: palette.onPrimaryContainer,
    secondary: palette.secondary,
    onSecondary: palette.onSecondary,
    background: palette.background,
    onBackground: palette.text,
    surface: palette.surface,
    onSurface: palette.text,
    surfaceAlt: palette.surfaceAlt,
    surfaceVariant: palette.surfaceAlt,
    border: palette.border,
    outline: palette.border,
    text: palette.text,
    textMuted: palette.textMuted,
    onSurfaceVariant: palette.textMuted,
    link: palette.link,
    error: palette.danger,
    danger: palette.danger,
    success: palette.success,
    shadow: palette.shadow,
    tabIconActive: palette.primary,
    tabIconInactive: palette.textMuted,
    inputBackground: palette.surface,
    inputPlaceholder: palette.textMuted,
    elevation: {
      level0: 'transparent',
      level1: palette.surface,
      level2: palette.surfaceAlt,
      level3: palette.surfaceAlt,
      level4: palette.surfaceAlt,
      level5: palette.surfaceAlt,
    },
  },
  components: {
    screen: {
      background: palette.background,
    },
    card: {
      background: palette.surface,
      borderColor: palette.border,
      borderRadius: sharedTokens.radius.lg,
    },
    button: {
      borderRadius: sharedTokens.radius.md,
      paddingVertical: sharedTokens.spacing.md,
      paddingHorizontal: sharedTokens.spacing.lg,
      variants: {
        primary: {
          background: palette.primary,
          borderColor: palette.primary,
          text: palette.onPrimary,
        },
        secondary: {
          background: palette.surfaceAlt,
          borderColor: palette.border,
          text: palette.text,
        },
        ghost: {
          background: 'transparent',
          borderColor: 'transparent',
          text: palette.primary,
        },
      },
    },
    input: {
      background: palette.surface,
      borderColor: palette.border,
      text: palette.text,
      placeholder: palette.textMuted,
      borderRadius: sharedTokens.radius.md,
      paddingHorizontal: sharedTokens.spacing.md,
      paddingVertical: sharedTokens.spacing.md,
    },
  },
  tokens: sharedTokens,
});

export const Lighttheme = buildTheme({ mode: 'light', palette: lightPalette });
export const Darktheme = buildTheme({ mode: 'dark', palette: darkPalette });

export const getThemeByMode = (mode) => (mode === 'dark' ? Darktheme : Lighttheme);

export const createNavigationTheme = (appTheme) => {
  const baseTheme = appTheme.dark ? DarkTheme : DefaultTheme;

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: appTheme.colors.primary,
      background: appTheme.colors.background,
      card: appTheme.colors.surface,
      text: appTheme.colors.text,
      border: appTheme.colors.border,
      notification: appTheme.colors.primary,
    },
  };
};

export const NavThemeLight = createNavigationTheme(Lighttheme);
export const NavThemeDark = createNavigationTheme(Darktheme);