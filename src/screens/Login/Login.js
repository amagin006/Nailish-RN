import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Firebase, { auth } from '../../config/Firebase';
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

  const _onPressLoginWithEmail = () => {
    Firebase.auth()
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
        const credential = Firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        try {
          auth.signInWithCredential(credential);
          props.navigation.navigate('CustomerListHome');
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
      <Image
        style={styles.logoImage}
        resizeMode={'contain'}
        source={require('../../../assets/images/logo2.png')}
      />
      <View style={styles.inner}>
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
        <TouchableOpacity style={styles.forgetButton}>
          <Text style={styles.forgetText}>Forget password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signButton} onPress={_onPressLoginWithEmail}>
          <Text style={styles.singButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity style={styles.googleSingButton} onPress={_googleLogin}>
          <Image
            style={styles.googleImage}
            resizeMode={'contain'}
            source={require('../../../assets/images/google_signin_btn.png')}
          />
        </TouchableOpacity>
        <View style={styles.signUpBox}>
          <Text style={styles.signUpleftText}>Don&apos;t have an account?</Text>
          <TouchableOpacity style={styles.signUpButton} onPress={_onPressSignup}>
            <Text style={styles.signUpButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  inner: {
    width: '80%',
    marginTop: 30,
  },
  logoImage: {
    alignSelf: 'center',
    height: 80,
    marginTop: '18%',
  },
  inputTextBox: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 5 : 0,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingVertical: 8,
  },
  errorText: {
    color: '#d61d00',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  space: {
    marginBottom: Platform.OS === 'ios' ? 25 : 27,
  },
  eyeIcon: {
    paddingTop: 3,
  },
  forgetButton: {
    alignSelf: 'center',
    marginBottom: 6,
    borderBottomColor: '#424242',
    borderBottomWidth: 1,
  },
  forgetText: {
    color: '#424242',
    paddingBottom: 3,
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
  border: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cfcfcf',
  },
  googleSingButton: {
    width: '48%',
    marginTop: -20,
    alignSelf: 'center',
  },
  googleImage: {
    width: '100%',
  },
  signUpButton: {
    alignSelf: 'center',
    borderBottomColor: '#344dd9',
    borderBottomWidth: 1,
  },
  signUpBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpleftText: {
    color: '#7d7d7d',
    marginRight: 6,
  },
  signUpButtonText: {
    color: '#344dd9',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
