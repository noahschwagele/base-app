// ProfileScreen.js
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import ThemeSelector from '../components/ThemeSelector';
import { ThemeContext } from '../contexts/ThemeContext';
import CustomNotificationSelector from '../components/CustomNotificationSelector';
import NotificationSelector from '../components/NotificationSelector';

const ProfileScreen = ({ navigation, route }) => {
  const {logout} = route.params;
  const { colors } = useContext(ThemeContext);
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.container}>
          <ThemeSelector/>
          <CustomNotificationSelector/>
          <NotificationSelector/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingHorizontal: 20,
    margin: 15
  },
  username: {
    fontSize: 20,
    marginVertical: 10,
  },
  card: {
    marginVertical: 20,
    width: '100%',
  },
  button: {
    width: '100%',
    borderRadius: 5,
    marginTop: 10,
  },
});

export default ProfileScreen;