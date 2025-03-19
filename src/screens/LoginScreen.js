// LoginScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Image  } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';

const LoginScreen = ({ navigation, route }) => {
  const {setUserToken} = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    setUserToken('1')
    
  };

  return (
    <>
    <View style={[{flex:1, backgroundColor: theme.colors.background}]}>
      
      <View style={[styles.background, {backgroundColor: theme.colors.primary}]} >
      {/* <Image source={require('../../assets/icon.png')} style={styles.logo} /> */}
        {/* <View style={[styles.logoBorder, {borderColor: theme.colors.surface}]}> */}
          <Text style={[styles.logotext, {color: theme.colors.surface}]}>BASE APP</Text>
        {/* </View> */}
        
      </View>
      <View style={[styles.form, styles.container]}>
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.loginButton}
          labelStyle={styles.buttonText}
        >
          LOGIN
        </Button>

        <Text style={styles.signupText}>
          Don't have an account?{' '}
          <Text
            style={styles.signupLink}
            onPress={() => console.log('navigate to signup')}
          >
            Sign up
          </Text>
        </Text>
      </View>
      
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  background:{
    flex:1,
    paddingHorizontal: 0,
    borderBottomEndRadius: -100,
    borderBottomStartRadius: 200,
    // borderTopLeftRadius: -10000,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 50
  },
  logoBorder: {
    position: 'absolute',
    fontWeight: 700,
    fontSize: 30,
    borderRadius: 1000,
    // borderColor: 'white',
    borderWidth: 10,
    // padding: 20,
    width: '50%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  logotext: {
    // color: 'white',
    fontWeight: 700,
    fontSize: 30,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
  },
  loginButton: {
    // flexGrow: 0.1,
    // alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    // paddingVertical: 12,
    // backgroundColor: '#4CAF50', // Customize button color
  },
  buttonText: {
    // flex: 1,
    // alignContent: 'center',
    // height: 50,
    color: 'white',
    paddingVertical: 5,
    width: '100%',
    fontSize: 16,
  },
  signupText: {
    marginTop: 20,
    textAlign: 'center',
  },
  signupLink: {
    color: '#3498db', // Customize signup link color
  },
});

export default LoginScreen;