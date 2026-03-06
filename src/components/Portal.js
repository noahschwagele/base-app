import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal as RNModal } from 'react-native';

/**
 * Portal component renders children above all other content
 * Uses React Native Modal to achieve overlay effect
 */
const Portal = ({ children, visible = true }) => {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  if (!isVisible) return null;

  return (
    <RNModal
      visible={isVisible}
      transparent={true}
      animationType="none"
      statusBarTranslucent
    >
      <View style={styles.portalContainer}>
        {children}
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  portalContainer: {
    flex: 1,
  },
});

export default Portal;
