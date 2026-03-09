// HomeScreen.js
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { 
  View, 
  ScrollView, 
  Text, 
  Button, 
  TextInput, 
  Card, 
  Switch,
  TouchableOpacity,
  Modal,
  Form
} from '../../components';
import { useOverlay } from '../../contexts/OverlayContext';
import { useToast } from '../../contexts/ToastContext';
import { sendLocalNotification } from '../../contexts/NotificationContext';

// In your component:
const handleNotificationSubmit = async (formValues) => {
  // formValues will contain all the form fields as an object
  // Map the form fields to notification parameters
  await sendLocalNotification(
    formValues.title,        // Maps to the title field from form
    formValues.body,         // Maps to the body field from form
    {
      // Any additional data you want to pass
      userId: formValues.userId,
      timestamp: new Date().toISOString(),
      // Or pass all remaining fields as data
      ...formValues
    }
  );
};

const HomeScreen = ({ navigation, route }) => {
  const { logout } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  
  // Use separate contexts for modals and toasts
  const { showModal: showContextModal, hideModal } = useOverlay();
  const { showToast } = useToast();

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Form submitted successfully!', { type: 'success' });
    }, 2000);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleSubscribe = () => {
    if (!newsletterEmail) {
      showToast('Please enter your email', { type: 'warning' });
      return;
    }
    
    setSubscribing(true);
    setTimeout(() => {
      setSubscribing(false);
      setShowModal(false);
      setNewsletterEmail('');
      showToast('Successfully subscribed to newsletter!', { type: 'success' });
    }, 1500);
  };

  const handleShowContextModal = () => {
    const modalId = 'demo-modal';
    showContextModal(
      modalId,
      <View style={{ padding: 20 }}>
        <Text variant="body1">This modal is created using the OverlayContext!</Text>
        <Text variant="body2" style={{ marginTop: 12 }}>
          You can create modals programmatically and manage them globally.
        </Text>
        <Button
          title="Close Modal"
          variant="primary"
          onPress={() => hideModal(modalId)}
          style={{ marginTop: 20 }}
        />
      </View>,
      {
        title: 'Context Modal',
        size: 'medium',
        animationType: 'scale',
      }
    );
  };

  return (
    <ScrollView surface contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text variant='displayMedium'>Welcome to</Text>
          <Text variant='headlineLarge'>Base-app</Text>
          <Text variant='body1' style={styles.subtitle}>
            Explore custom themed components
          </Text>
        </View>
        
        <Form
          title="Send Notification"
          schema={[
            { 
              name: "title", 
              type: "text", 
              label: "Notification Title", 
              placeholder: "Enter title",
              required: true 
            },
            { 
              name: "body", 
              type: "textarea", 
              label: "Notification Body", 
              placeholder: "Enter notification message",
              required: false 
            },
             { 
              name: "url", 
              type: "text", 
              label: "Notification URL", 
              placeholder: "Enter URL",
              required: true 
            },
            { 
              name: "id", 
              type: "number", 
              label: "ID (optional)", 
              placeholder: "123"
            }
          ]}
          initialValues={{
              title : "Test Notification"
          }
          }
          submitLabel="Send Notification"
          onSubmit={handleNotificationSubmit}
          onSuccess={() => showToast('Notification sent!', { type: 'success' })}
          onError={(error) => showToast(error.message, { type: 'error' })}
        />

        {/* Modals & Toasts Section */}
        {/* <Card elevation={2} style={styles.card}>
          <Text variant='titleLarge' style={styles.sectionTitle}>
            Modals & Toasts
          </Text>
          
          <Button
            title="Show Modal"
            variant="primary"
            onPress={handleShowModal}
            style={styles.button}
          />

          <Button
            title="Show Context Modal"
            variant="secondary"
            onPress={handleShowContextModal}
            style={styles.button}
          />

          <View style={styles.toastButtonRow}>
            <Button
              title="Success"
              variant="outline"
              size="small"
              onPress={() => showToast('Success message!', { type: 'success' })}
              style={styles.toastButton}
            />
            <Button
              title="Error"
              variant="outline"
              size="small"
              onPress={() => showToast('Error occurred!', { type: 'error' })}
              style={styles.toastButton}
            />
            <Button
              title="Warning"
              variant="outline"
              size="small"
              onPress={() => showToast('Warning message!', { type: 'warning' })}
              style={styles.toastButton}
            />
            <Button
              title="Info"
              variant="outline"
              size="small"
              onPress={() => showToast('Info message!', { type: 'info' })}
              style={styles.toastButton}
            />
          </View>

          <Button
            title="Show Bottom Toast"
            variant="text"
            onPress={() => showToast('Bottom positioned toast', { 
              type: 'info', 
              position: 'bottom' 
            })}
            style={styles.button}
          />
        </Card> */}

        {/* Components Showcase */}
        {/* <Card elevation={2} style={styles.card}>
          <Text variant='titleLarge' style={styles.sectionTitle}>
            Typography Examples
          </Text>
          <Text variant='headlineMedium'>Headline Medium</Text>
          <Text variant='titleMedium'>Title Medium</Text>
          <Text variant='body1'>Body text - regular paragraph content</Text>
          <Text variant='caption'>Caption text - smaller details</Text>
        </Card> */}

        {/* Form Card */}
        {/* <Card elevation={2} style={styles.card}>
          <Text variant='titleLarge' style={styles.sectionTitle}>
            Form Components
          </Text>
          
          <TextInput
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            helperText="We'll never share your email"
          />

          <TextInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            mode="filled"
          />

          <View style={styles.switchContainer}>
            <Switch
              value={isEnabled}
              onValueChange={setIsEnabled}
              label="Enable notifications"
            />
          </View>
        </Card> */}

        {/* Buttons Card */}
        {/* <Card elevation={2} style={styles.card}>
          <Text variant='titleLarge' style={styles.sectionTitle}>
            Button Variants
          </Text>
          
          <Button
            title="Primary Button"
            variant="primary"
            onPress={handleSubmit}
            loading={loading}
            style={styles.button}
          />

          <Button
            title="Secondary Button"
            variant="secondary"
            onPress={() => alert('Secondary pressed')}
            style={styles.button}
          />

          <Button
            title="Outline Button"
            variant="outline"
            onPress={() => alert('Outline pressed')}
            style={styles.button}
          />

          <Button
            title="Text Button"
            variant="text"
            onPress={() => alert('Text pressed')}
            style={styles.button}
          />

          <Button
            title="Small Button"
            variant="primary"
            size="small"
            onPress={() => alert('Small pressed')}
            style={styles.button}
          />

          <Button
            title="Disabled Button"
            variant="primary"
            disabled
            style={styles.button}
          />
        </Card> */}

        {/* Interactive Card */}
        {/* <TouchableOpacity onPress={() => alert('Card tapped!')}>
          <Card elevation={3} style={styles.card}>
            <Text variant='titleMedium'>Tap this card!</Text>
            <Text variant='body2' style={styles.tapHint}>
              This card is wrapped in a TouchableOpacity
            </Text>
          </Card>
        </TouchableOpacity> */}

        {/* Elevated Cards */}
        {/* <View style={styles.elevationRow}>
          <Card elevation={1} style={styles.smallCard}>
            <Text variant='caption'>Level 1</Text>
          </Card>
          <Card elevation={3} style={styles.smallCard}>
            <Text variant='caption'>Level 3</Text>
          </Card>
          <Card elevation={5} style={styles.smallCard}>
            <Text variant='caption'>Level 5</Text>
          </Card>
        </View> */}

        {/* Outlined Card */}
        {/* <Card mode="outlined" style={styles.card}>
          <Text variant='titleMedium'>Outlined Card</Text>
          <Text variant='body2'>
            This card uses the outlined mode instead of elevation
          </Text>
        </Card> */}
      </View>

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    
    paddingBottom: 20,
  },
  container: {
    gap:10,
    padding: 16,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  subtitle: {
    marginTop: 8,
    opacity: 0.7,
  },
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  switchContainer: {
    marginTop: 8,
  },
  button: {
    marginTop: 12,
  },
  toastButtonRow: {
    flexDirection: 'row',
  newsletterContainer: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconText: {
    fontSize: 40,
  },
  newsletterTitle: {
    textAlign: 'center',
    marginBottom: 12,
  },
  newsletterDescription: {
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 24,
    lineHeight: 20,
  },
  newsletterActions: {
    width: '100%',
    marginTop: 8,
  },
  subscribeButton: {
    marginBottom: 8,
  },
  laterButton: {
    marginTop: 4,
  },
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  toastButton: {
    flex: 1,
    minWidth: 70,
  },
  tapHint: {
    marginTop: 4,
    opacity: 0.7,
  },
  elevationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  smallCard: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
});

export default HomeScreen;