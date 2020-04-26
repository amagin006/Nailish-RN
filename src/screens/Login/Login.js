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
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { userLoginWithPass, userLogout, googleLogin } from '../../redux/actions/auth';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassward] = useState('');
  const [isPasswordInVisible, setIsPasswordInVisible] = useState(true);
  const [emailPassError, setEmaiPassError] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();
  const reduxState = useSelector(state => state);

  const _onPressLoginWithEmail = () => {
    dispatch(userLoginWithPass({ email, password }));
  };

  const _googleLogin = async () => {
    dispatch(googleLogin());
  };

  const _onPressSignup = () => {
    setIsSignup(true);
  };

  const _onForgetPass = () => {
    // dispatch(userLogout());
  };

  const borderColor = emailPassError ? { borderColor: '#d61d00' } : { borderColor: '#ccc' };
  console.log('LoginScreen - reduxState', reduxState);
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
        {isSignup ? (
          <TouchableOpacity
            style={[styles.signButton, styles.createButton]}
            onPress={_onPressLoginWithEmail}>
            <Text style={styles.singButtonText}>Create Account</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.forgetButton} onPress={_onForgetPass}>
              <Text style={styles.forgetText}>Forget password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signButton} onPress={_onPressLoginWithEmail}>
              <Text style={styles.singButtonText}>Login</Text>
            </TouchableOpacity>
          </>
        )}
        <View style={styles.border} />
        <TouchableOpacity style={styles.googleSingButton} onPress={_googleLogin}>
          <Image
            style={styles.googleImage}
            resizeMode={'contain'}
            source={require('../../../assets/images/google_signin_btn.png')}
          />
        </TouchableOpacity>
        <View style={styles.signUpBox}>
          <Text style={styles.signUpleftText}>
            {isSignup ? 'Already have account?' : "Don't have an account?"}
          </Text>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={isSignup ? () => setIsSignup(false) : _onPressSignup}>
            <Text style={styles.signUpButtonText}>{isSignup ? 'Sign in' : 'Sign up'}</Text>
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
  createButton: {
    backgroundColor: '#2482bd',
  },
  singButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
