import React, { useContext } from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

const ScrollView = ({ 
  children, 
  backgroundColor,
  surface = false,
  style,
  contentContainerStyle,
  ...props 
}) => {
  const { paperTheme } = useContext(ThemeContext);
  const colors = paperTheme.colors;

  const getBackgroundColor = () => {
    if (backgroundColor) return backgroundColor;
    if (surface) return colors.surface;
    return colors.background;
  };

  return (
    <RNScrollView
      style={[
        // { backgroundColor: getBackgroundColor() },
        style,
      ]}
      contentContainerStyle={contentContainerStyle}
      {...props}
    >
      {children}
    </RNScrollView>
  );
};

export default ScrollView;
