import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  ...props
}) => {
  const { paperTheme } = useContext(ThemeContext);
  const colors = paperTheme.colors;

  const sizeStyles = {
    small: { paddingVertical: 8, paddingHorizontal: 16, fontSize: 14 },
    medium: { paddingVertical: 12, paddingHorizontal: 24, fontSize: 16 },
    large: { paddingVertical: 16, paddingHorizontal: 32, fontSize: 18 },
  };

  const variantStyles = {
    primary: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      textColor: colors.onPrimary,
      borderWidth: 1,
    },
    secondary: {
      backgroundColor: colors.secondary || colors.surfaceVariant,
      borderColor: colors.secondary || colors.border,
      textColor: colors.onSecondary || colors.onSurface,
      borderWidth: 1,
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: colors.primary,
      textColor: colors.primary,
      borderWidth: 1,
    },
    text: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      textColor: colors.primary,
      borderWidth: 1,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      textColor: colors.primary,
      borderWidth: 1,
    },
  };

  const resolvedSize = sizeStyles[size] || sizeStyles.medium;
  const resolvedVariant = variantStyles[variant] || variantStyles.primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
      style={[
        styles.base,
        {
          backgroundColor: resolvedVariant.backgroundColor,
          borderColor: resolvedVariant.borderColor,
          borderWidth: resolvedVariant.borderWidth,
          paddingVertical: resolvedSize.paddingVertical,
          paddingHorizontal: resolvedSize.paddingHorizontal,
          opacity: disabled ? 0.55 : 1,
        },
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={resolvedVariant.textColor} size="small" />
      ) : (
        <Text
          style={[
            styles.text,
            { color: resolvedVariant.textColor, fontSize: resolvedSize.fontSize },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '600',
  },
});

export default Button;
