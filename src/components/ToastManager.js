import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useToast } from '../contexts/ToastContext';
import Toast from './Toast';

/**
 * ToastManager renders all active toasts without blocking user interaction
 * Uses pointerEvents='box-none' to allow touches to pass through
 */
const ToastManager = () => {
  const { toasts, dismissToast } = useToast();

  if (!toasts || toasts.length === 0) return null;

  return (
    <View style={styles.container} pointerEvents="box-none">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          position={toast.position}
          visible={true}
          onDismiss={() => dismissToast(toast.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
});

export default ToastManager;
