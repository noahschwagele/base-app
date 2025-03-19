// ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Card , Button} from 'react-native-paper';
import ThemeSelector from '../components/ThemeSelector';

const ProfileScreen = ({ navigation, route }) => {
  const {logout} = route.params;
  return (
    <View style={styles.container}>
      {/* <Avatar.Image size={100} source={require('./assets/profile.jpg')} /> */}
        <View style={styles.container}>
          <ThemeSelector/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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