// ProfileScreen.js
import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';

const HomeScreen = ({ navigation, route }) => {
  const {logout} = route.params;
  return (
    <View style={styles.container}>
        <View style={styles.container}>
            <Text variant='headlineMedium'>Welcome to</Text>
            <Text variant='headlineMedium'>Base-app</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
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

export default HomeScreen;