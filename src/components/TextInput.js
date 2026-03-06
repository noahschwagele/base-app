import React, { useContext, useState } from 'react';
import { TextInput as RNTextInput, View, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import Text from './Text';

const TextInput = ({ 
  label,
  error,
  errorText,
  helperText,
  mode = 'outlined', // outlined, filled
  disabled = false,
  style,
  containerStyle,
  ...props 
}) => {
  const { paperTheme } = useContext(ThemeContext);
  const colors = paperTheme.colors;
  const [isFocused, setIsFocused] = useState(false);

  const getInputContainerStyle = () => {
    const baseStyle = {
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
    };

    if (mode === 'outlined') {
      return {
        ...baseStyle,
        borderWidth: error ? 2 : isFocused ? 2 : 1,
        borderColor: error ? colors.error : isFocused ? colors.primary : colors.outline,
        backgroundColor: 'transparent',
      };
    } else {
      // filled mode
      return {
        ...baseStyle,
        backgroundColor: colors.surfaceVariant,
        borderBottomWidth: error ? 2 : isFocused ? 2 : 1,
        borderBottomColor: error ? colors.error : isFocused ? colors.primary : colors.outline,
      };
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text variant="label" style={styles.label}>
          {label}
        </Text>
      )}
      <View style={getInputContainerStyle()}>
        <RNTextInput
          style={[
            styles.input,
            { color: colors.onSurface },
            style,
          ]}
          placeholderTextColor={colors.onSurfaceVariant}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          {...props}
        />
      </View>
      {error && errorText && (
        <Text variant="caption" color={colors.error} style={styles.helperText}>
          {errorText}
        </Text>
      )}
      {!error && helperText && (
        <Text variant="caption" color={colors.onSurfaceVariant} style={styles.helperText}>
          {helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    minHeight: 24,
  },
  helperText: {
    marginTop: 4,
    marginLeft: 16,
  },
});

export default TextInput;
