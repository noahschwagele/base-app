// LoginScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
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
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Image source={require('../../assets/icon.png')} style={styles.logo} />

      <View style={styles.form}>
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
          Login
        </Button>

        <Text style={styles.signupText}>
          Don't have an account?{' '}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate('Signup')}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 50
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
  },
  loginButton: {
    marginTop: 20,
    paddingVertical: 12,
    // backgroundColor: '#4CAF50', // Customize button color
  },
  buttonText: {
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