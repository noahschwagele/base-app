import React, { useContext, useEffect } from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  Animated,
  Dimensions,
} from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import View from './View';
import Text from './Text';

const { width } = Dimensions.get('window');

/**
 * Toast component for temporary notifications
 * Shows at top, center, or bottom of screen
 */
const Toast = ({ 
  message,
  type = 'info', // info, success, error, warning
  position = 'top', // top, center, bottom
  onDismiss,
  visible = true,
  duration = 3000,
}) => {
  const { paperTheme } = useContext(ThemeContext);
  const colors = paperTheme.colors;
  const [fadeAnim] = React.useState(new Animated.Value(0));
  const [slideAnim] = React.useState(new Animated.Value(-100));

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const getToastColor = () => {
    switch (type) {
      case 'success':
        return colors.primary || '#4CAF50';
      case 'error':
        return colors.error || '#F44336';
      case 'warning':
        return '#FF9800';
      case 'info':
      default:
        return colors.secondary || '#2196F3';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  const getPositionStyle = () => {
    switch (position) {
      case 'top':
        return { top: 50 };
      case 'bottom':
        return { bottom: 50 };
      case 'center':
        return { 
          top: '50%', 
          transform: [{ translateY: -50 }] 
        };
      default:
        return { top: 50 };
    }
  };

  if (!visible) return null;

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.container,
        getPositionStyle(),
        {
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            ...(getPositionStyle().transform || [])
          ],
        },
      ]}
    >
      <TouchableOpacity 
        onPress={onDismiss}
        activeOpacity={0.9}
        style={styles.touchable}
      >
        <View 
          style={[
            styles.toast,
            { 
              backgroundColor: getToastColor(),
              shadowColor: colors.shadow || '#000',
            }
          ]}
        >
          <View style={styles.iconContainer}>
            <Text variant="titleMedium" style={styles.icon}>
              {getIcon()}
            </Text>
          </View>
          <Text 
            variant="body2" 
            style={styles.message}
            color="#ffffff"
          >
            {message}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

/**
 * ToastContainer renders all active toasts
 * Used by OverlayContext to display multiple toasts
 */
export const ToastContainer = ({ toasts, onDismiss }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          position={toast.position}
          visible={true}
          onDismiss={() => onDismiss(toast.id)}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 9999,
  },
  touchable: {
    width: '100%',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    maxWidth: width - 40,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    marginRight: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#ffffff',
    fontSize: 18,
  },
  message: {
    flex: 1,
    color: '#ffffff',
  },
});

export default Toast;
