import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

const Card = ({ 
  children, 
  elevation = 1, // 0-5 for different elevation levels
  mode = 'elevated', // elevated, outlined
  style,
  ...props 
}) => {
  const { paperTheme } = useContext(ThemeContext);
  const colors = paperTheme.colors;

  const getCardStyle = () => {
    const baseStyle = {
      borderRadius: 12,
      padding: 16,
    };

    if (mode === 'outlined') {
      return {
        ...baseStyle,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.outline,
      };
    } else {
      // elevated mode
      const elevationColor = colors.elevation 
        ? colors.elevation[`level${elevation}`] 
        : colors.surface;
      
      return {
        ...baseStyle,
        backgroundColor: elevationColor,
        shadowColor: colors.shadow,
        shadowOffset: {
          width: 0,
          height: elevation * 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: elevation * 2.62,
        elevation: elevation * 4, // Android elevation
      };
    }
  };

  return (
    <View style={[getCardStyle(), style]} {...props}>
      {children}
    </View>
  );
};

export default Card;
