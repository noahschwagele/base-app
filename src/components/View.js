import React, { useContext } from 'react';
import { View as RNView } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

const View = ({ 
  children, 
  backgroundColor,
  surface = false, // use surface color from theme
  elevation = 0, // 0-5 for material design elevation
  style,
  ...props 
}) => {
  const { paperTheme } = useContext(ThemeContext);
  const colors = paperTheme.colors;

  const getBackgroundColor = () => {
    if (backgroundColor) return backgroundColor;
    if (surface) return colors.surface;
    if (elevation > 0 && colors.elevation) {
      return colors.elevation[`level${elevation}`] || colors.surface;
    }
    return undefined;
  };

  return (
    <RNView
      style={[
        { backgroundColor: getBackgroundColor() },
        style,
      ]}
      {...props}
    >
      {children}
    </RNView>
  );
};

export default View;
