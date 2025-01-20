// ProfileScreen.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card , Button} from 'react-native-paper';
import GJ from 'react-native-camera2-gjcamera'

const HomeScreen = ({ navigation, route }) => {
  const {logout} = route.params;

  OpenMyCamer = async () => {
    const result = await GJ.OpenMyCamera();
    console.log({ imgPATH: result.imgPath });
    }

  return (
    <View style={styles.container}>
      {/* <Avatar.Image size={100} source={require('./assets/profile.jpg')} /> */}
        <View style={styles.container}>
        <TouchableOpacity onPress={() => this.OpenMyCamer()}>
           <Text>Open Camera</Text>
        </TouchableOpacity>
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