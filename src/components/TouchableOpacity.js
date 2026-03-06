import React, { useContext } from 'react';
import { TouchableOpacity as RNTouchableOpacity } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

const TouchableOpacity = ({ 
  children, 
  backgroundColor,
  surface = false,
  rippleColor, // for android ripple effect
  style,
  ...props 
}) => {
  const { paperTheme } = useContext(ThemeContext);
  const colors = paperTheme.colors;

  const getBackgroundColor = () => {
    if (backgroundColor) return backgroundColor;
    if (surface) return colors.surface;
    return undefined;
  };

  return (
    <RNTouchableOpacity
      style={[
        { backgroundColor: getBackgroundColor() },
        style,
      ]}
      activeOpacity={0.7}
      {...props}
    >
      {children}
    </RNTouchableOpacity>
  );
};

export default TouchableOpacity;
