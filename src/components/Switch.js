import React, { useContext } from 'react';
import { Switch as RNSwitch, View, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import Text from './Text';

const Switch = ({ 
  value,
  onValueChange,
  label,
  labelPosition = 'right', // left, right
  disabled = false,
  style,
  ...props 
}) => {
  const { paperTheme } = useContext(ThemeContext);
  const colors = paperTheme.colors;

  const switchComponent = (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      // trackColor={{ 
      //   false: colors.surfaceVariant, 
      //   true: colors.primaryContainer 
      // }}
      thumbColor={value ? colors.primary : colors.outline}
      ios_backgroundColor={colors.surfaceVariant}
      {...props}
    />
  );

  if (!label) {
    return switchComponent;
  }

  return (
    <View style={[styles.container, style]}>
      {labelPosition === 'left' && (
        <Text variant="body1" style={styles.label}>
          {label}
        </Text>
      )}
      {switchComponent}
      {labelPosition === 'right' && (
        <Text variant="body1" style={styles.label}>
          {label}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    flex: 1,
    marginHorizontal: 12,
  },
});

export default Switch;
