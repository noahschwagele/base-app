import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const LoadingSpinner = ({ size = 'large', style }) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size}  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingSpinner;
