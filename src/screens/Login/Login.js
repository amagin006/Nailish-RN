import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import firebase, { auth } from '../../config/Firebase';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import * as Google from 'expo-google-app-auth';
import {
  GOOGLE_AUTH_IOS_CLIENT_ID,
  GOOGLE_AUTH_ANDROID_CLIENT_ID,
  GOOGLE_IOS_STANDALONE_CLIENT_ID,
  GOOGLE_ANDROID_STANDALONE_CLIENT_ID,
} from 'react-native-dotenv';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassward] = useState('');
  const [isPasswordInVisible, setIsPasswordInVisible] = useState(true);
  const [emailPassError, setEmaiPassError] = useState(false);

  const _onPressLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('login');
        props.navigation.navigate('CustomerListHome');
      })
      .catch(error => {
        console.log('Error signInWithEmailAndPassword: ', error);
        setEmaiPassError(true);
      });
  };

  const _googleLogin = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: GOOGLE_AUTH_IOS_CLIENT_ID,
        androidClientId: GOOGLE_AUTH_ANDROID_CLIENT_ID,
        iosStandaloneAppClientId: GOOGLE_IOS_STANDALONE_CLIENT_ID,
        androidStandaloneAppClientId: GOOGLE_ANDROID_STANDALONE_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      console.log('res----googleLogin', result);
      if (result.type === 'success') {
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        try {
          auth.signInWithCredential(credential);
        } catch (err) {
          console.log('Google Auth Error: ', err);
        }
      } else {
        console.log('Google Auth is not success - Error_type:', result.type);
      }
    } catch (err) {
      console.log('Google login Async - Error: ', err);
    }
  };

  const _onPressSignup = () => {
    // props.navigation.navigate('SignUp');
  };

  const borderColor = emailPassError ? { borderColor: '#d61d00' } : { borderColor: '#ccc' };
  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.contentWrapper}>
        <Image style={styles.logoImage} source={require('../../../assets/images/logo2.png')} />
        {emailPassError ? (
          <Text style={styles.errorText}>Email or Password is wrong.</Text>
        ) : (
          <View style={styles.space} />
        )}
        <View style={[styles.inputTextBox, borderColor]}>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder={'Enter your email'}
            onFocus={() => setEmaiPassError(false)}
          />
        </View>
        <View style={[styles.inputTextBox, borderColor]}>
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={text => setPassward(text)}
            placeholder={'Enter your password'}
            onFocus={() => setEmaiPassError(false)}
            secureTextEntry={isPasswordInVisible}
          />
          <TouchableOpacity onPress={() => setIsPasswordInVisible(!isPasswordInVisible)}>
            <Ionicons
              style={styles.eyeIcon}
              name={isPasswordInVisible ? 'md-eye-off' : 'md-eye'}
              size={26}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signButton} onPress={_onPressLogin}>
          <Text style={styles.singButtonText}>Login</Text>
        </TouchableOpacity>
        <Button title={'goSignUp'} onPress={_onPressSignup} />
        <Button title={'google'} onPress={_googleLogin} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  contentWrapper: {
    width: '80%',
  },
  logoImage: {
    alignSelf: 'center',
    width: '80%',
    resizeMode: 'contain',
    marginBottom: 30,
  },
  inputTextBox: {
    height: 48,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
  },
  errorText: {
    color: '#d61d00',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  space: {
    marginBottom: 24,
  },
  eyeIcon: {
    paddingTop: 3,
  },
  signButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#96CEB4',
    marginTop: 10,
    borderRadius: 18,
    marginHorizontal: 20,
  },
  singButtonText: {
    color: '#fff',
    fontSize: 16,
    paddingVertical: 10,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
