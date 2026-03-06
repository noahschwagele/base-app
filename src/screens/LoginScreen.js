// LoginScreen.js
import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import AppButton from '../components/Button';
import AppText from '../components/Text';
import AppTextInput from '../components/TextInput';

const LoginScreen = ({ navigation, route }) => {
  const {setUserToken} = route.params;
  const { colors } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    setUserToken('1')
    
  };

  return (
    <>
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      
      <View style={[styles.background, { backgroundColor: colors.surfaceAlt }]} >
      {/* <Image source={require('../../assets/icon.png')} style={styles.logo} /> */}
        {/* <View style={[styles.logoBorder]}> */}
          <AppText variant="title" style={styles.logotext}>BASE APP</AppText>
        {/* </View> */}
        
      </View>
      <View style={[styles.form, styles.container]}>
        <AppTextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="your@email.com"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
        <AppTextInput
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          style={styles.input}
        />

        <AppButton
          onPress={handleLogin}
          style={styles.loginButton}
          title="LOGIN"
        />

        <AppText style={styles.signupText}>
          Don't have an account?{' '}
          <AppText
            style={[styles.signupLink, { color: colors.link }]}
            onPress={() => console.log('navigate to signup')}
          >
            Sign up
          </AppText>
        </AppText>
      </View>
      
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
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
    fontWeight: '700',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
  },
  loginButton: {
    marginTop: 8,
  },
  signupText: {
    marginTop: 20,
    textAlign: 'center',
  },
  signupLink: {
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;