import React, { useContext, useEffect } from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import Portal from './Portal';
import View from './View';
import Text from './Text';
import Button from './Button';

const { width, height } = Dimensions.get('window');

/**
 * Modal component with backdrop and animations
 * Can be used standalone or with OverlayContext
 */
const Modal = ({ 
  visible = false,
  onClose,
  title,
  children,
  actions, // Array of {label, onPress, variant}
  size = 'medium', // small, medium, large, full
  dismissable = true,
  showCloseButton = true,
  animationType = 'fade', // fade, slide, scale
  style,
  contentStyle,
}) => {
  const { paperTheme } = useContext(ThemeContext);
  const colors = paperTheme.colors;
  const [fadeAnim] = React.useState(new Animated.Value(0));
  const [scaleAnim] = React.useState(new Animated.Value(0.9));
  const [slideAnim] = React.useState(new Animated.Value(height));

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
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
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleBackdropPress = () => {
    if (dismissable && onClose) {
      onClose();
    }
  };

  const getModalSize = () => {
    switch (size) {
      case 'small':
        return { width: width * 0.7, maxHeight: height * 0.4 };
      case 'medium':
        return { width: width * 0.85, maxHeight: height * 0.6 };
      case 'large':
        return { width: width * 0.95, maxHeight: height * 0.8 };
      case 'full':
        return { width: width, height: height };
      default:
        return { width: width * 0.85, maxHeight: height * 0.6 };
    }
  };

  const getAnimationStyle = () => {
    switch (animationType) {
      case 'scale':
        return { transform: [{ scale: scaleAnim }], opacity: fadeAnim };
      case 'slide':
        return { transform: [{ translateY: slideAnim }], opacity: fadeAnim };
      case 'fade':
      default:
        return { opacity: fadeAnim };
    }
  };

  if (!visible) return null;

  return (
    <Portal visible={visible}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <Animated.View 
            style={[
              styles.backdrop, 
              { backgroundColor: colors.backdrop || 'rgba(0,0,0,0.5)', opacity: fadeAnim }
            ]}
          />
        </TouchableWithoutFeedback>

        <Animated.View 
          style={[
            styles.modalContainer,
            getModalSize(),
            getAnimationStyle(),
            style,
          ]}
        >
          <View 
            surface 
            elevation={5} 
            style={[styles.modalContent, contentStyle]}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <View style={styles.header}>
                {title && (
                  <Text variant="titleLarge" style={styles.title}>
                    {title}
                  </Text>
                )}
                {showCloseButton && dismissable && (
                  <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text variant="titleMedium" color={colors.onSurfaceVariant}>
                      ✕
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Content */}
            <View style={styles.body}>
              {children}
            </View>

            {/* Actions */}
            {actions && actions.length > 0 && (
              <View style={styles.actions}>
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    title={action.label}
                    onPress={action.onPress}
                    variant={action.variant || 'text'}
                    style={[styles.actionButton, action.style]}
                  />
                ))}
              </View>
            )}
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalContent: {
    flex: 1,
    borderRadius: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    flex: 1,
  },
  closeButton: {
    padding: 4,
    marginLeft: 16,
  },
  body: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    paddingTop: 8,
    gap: 8,
  },
  actionButton: {
    minWidth: 80,
  },
});

export default Modal;
