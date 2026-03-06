import React, { useContext } from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

const Text = ({ 
  children, 
  variant = 'body1', // displayLarge, displayMedium, headlineLarge, headlineMedium, headlineSmall, titleLarge, titleMedium, titleSmall, body1, body2, caption, label
  color,
  style,
  ...props 
}) => {
  const { paperTheme } = useContext(ThemeContext);
  const colors = paperTheme.colors;

  const getVariantStyle = () => {
    const variants = {
      displayLarge: { fontSize: 57, fontWeight: '400', lineHeight: 64 },
      displayMedium: { fontSize: 45, fontWeight: '400', lineHeight: 52 },
      displaySmall: { fontSize: 36, fontWeight: '400', lineHeight: 44 },
      headlineLarge: { fontSize: 32, fontWeight: '400', lineHeight: 40 },
      headlineMedium: { fontSize: 28, fontWeight: '400', lineHeight: 36 },
      headlineSmall: { fontSize: 24, fontWeight: '400', lineHeight: 32 },
      titleLarge: { fontSize: 22, fontWeight: '500', lineHeight: 28 },
      titleMedium: { fontSize: 16, fontWeight: '500', lineHeight: 24 },
      titleSmall: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
      body1: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
      body2: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
      caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
      label: { fontSize: 11, fontWeight: '500', lineHeight: 16 },
    };

    return variants[variant] || variants.body1;
  };

  return (
    <RNText
      style={[
        { color: color || colors.text || colors.onSurface },
        getVariantStyle(),
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

export default Text;
