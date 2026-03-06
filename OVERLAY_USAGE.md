# Modal, Toast, and Portal System

This document explains how to use the Modal, Toast, and Portal components with separate context providers.

## Overview

The overlay system provides:
- **Portal**: Renders content above all other content
- **Modal**: Full-featured modal dialogs with animations
- **Toast**: Non-blocking temporary notification messages
- **OverlayContext**: Global state management for modals
- **ToastContext**: Global state management for toasts (separate provider for better organization)

## Setup

The system is already integrated in your app. The setup in `App.js`:

```javascript
import { OverlayProvider } from "./src/contexts/OverlayContext";
import { ToastProvider } from "./src/contexts/ToastContext";
import { OverlayRenderer, ToastManager } from "./src/components";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <OverlayProvider>
          <AppContent />
        </OverlayProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

// Add OverlayRenderer and ToastManager in your navigation container
const AppContent = () => {
  return (
    <NavigationContainer theme={navTheme}>
      <MainNav />
      <OverlayRenderer />
      <ToastManager />
    </NavigationContainer>
  );
};
```

**Important**: ToastManager uses `pointerEvents='box-none'` to ensure toasts don't block user interaction with the underlying content.

## Using Modals

### Standalone Modal

Import and use the Modal component directly:

```javascript
import { Modal, Button, Text, View } from '../../components';

const MyScreen = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button title="Show Modal" onPress={() => setShowModal(true)} />
      
      <Modal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="My Modal"
        size="medium" // small, medium, large, full
        animationType="slide" // fade, slide, scale
        dismissable={true}
        actions={[
          {
            label: 'Cancel',
            onPress: () => setShowModal(false),
            variant: 'text',
          },
          {
            label: 'Confirm',
            onPress: handleConfirm,
            variant: 'primary',
          },
        ]}
      >
        <View>
          <Text>Modal content goes here</Text>
        </View>
      </Modal>
    </>
  );
};
```

### Context-Based Modal

Use the OverlayContext to show modals programmatically:

```javascript
import { useOverlay } from '../../contexts/OverlayContext';
import { Button, Text, View } from '../../components';

const MyScreen = () => {
  const { showModal, hideModal } = useOverlay();

  const handleShowModal = () => {
    const modalId = 'my-modal';
    showModal(
      modalId,
      <View style={{ padding: 20 }}>
        <Text>This is a programmatic modal!</Text>
        <Button
          title="Close"
          onPress={() => hideModal(modalId)}
        />
      </View>,
      {
        title: 'Context Modal',
        size: 'medium',
        animationType: 'scale',
        dismissable: true,
      }
    );
  };

  return (
    <Button title="Show Modal" onPress={handleShowModal} />
  );
};
```

### Modal Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | boolean | false | Controls modal visibility |
| `onClose` | function | - | Called when modal is dismissed |
| `title` | string | - | Modal title |
| `children` | ReactNode | - | Modal content |
| `actions` | array | - | Action buttons [{label, onPress, variant}] |
| `size` | string | 'medium' | Modal size: small, medium, large, full |
| `dismissable` | boolean | true | Can dismiss by tapping backdrop |
| `showCloseButton` | boolean | true | Show X button in header |
| `animationType` | string | 'fade' | Animation: fade, slide, scale |

## Using Toasts

Use the ToastContext to show non-blocking toast notifications:

```javascript
import { useToast } from '../../contexts/ToastContext';
import { Button } from '../../components';

const MyScreen = () => {
  const { showToast } = useToast();

  const handleSuccess = () => {
    showToast('Operation successful!', { 
      type: 'success',
      duration: 3000,
      position: 'top'
    });
  };

  const handleError = () => {
    showToast('An error occurred!', { type: 'error' });
  };

  const handleWarning = () => {
    showToast('Warning message', { 
      type: 'warning',
      position: 'bottom'
    });
  };

  const handleInfo = () => {
    showToast('Information', { type: 'info' });
  };

  return (
    <>
      <Button title="Success Toast" onPress={handleSuccess} />
      <Button title="Error Toast" onPress={handleError} />
      <Button title="Warning Toast" onPress={handleWarning} />
      <Button title="Info Toast" onPress={handleInfo} />
    </>
  );
};
```

### Toast Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | 'info' | Toast type: info, success, error, warning |
| `duration` | number | 3000 | Auto-dismiss duration in ms (0 = no auto-dismiss) |
| `position` | string | 'top' | Position: top, center, bottom |

## Using Portal

The Portal component renders content above all other content:

```javascript
import { Portal, View, Text } from '../../components';

const MyComponent = () => {
  return (
    <Portal visible={true}>
      <View style={{ 
        position: 'absolute', 
        top: 100, 
        left: 20 
      }}>
        <Text>This content is rendered above everything!</Text>
      </View>
    </Portal>
  );
};
```

## Context APIs

### OverlayContext API

```javascript
import { useOverlay } from '../../contexts/OverlayContext';

const {
  // Modal state and functions
  modals,           // Array of active modals
  showModal,        // (id, content, options) => void
  hideModal,        // (id) => void
  hideAllModals,    // () => void
} = useOverlay();
```

### ToastContext API

```javascript
import { useToast } from '../../contexts/ToastContext';

const {
  // Toast state and functions
  toasts,           // Array of active toasts
  showToast,        // (message, options) => toastId
  dismissToast,     // (id) => void
  dismissAllToasts, // () => void
} = useToast();
```

## Key Features

- **Non-blocking Toasts**: Toasts use `pointerEvents='box-none'` allowing users to interact with content while toasts are visible
- **Separate Providers**: Modals and toasts are managed by separate providers for better organization
- **Auto-dismiss**: Toasts automatically dismiss after the specified duration

## Examples

See the HomeScreen component for complete working examples of all features.

## Theming

All components automatically use your app's theme from ThemeContext. Colors adapt to light/dark mode automatically.
